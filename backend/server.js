const models = require('./models')
const enviroment = require('./environment')
const interledger = require('./interledger-api')

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');

//var path = __dirname + '/templates/'
var jsonParser = bodyParser.json()

const app = express();
const port = 4000;

app.use('/public', express.static('public'))
//app.user(reload(path))
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({
  extended: true
}))

function addressFromUsername(username) {
  return "http://localhost:7770/accounts/" + username + "/spsp"
}

app.get('/', (req, res, next) => {
  try {
    ejs.renderFile("templates/index.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

app.get('/about', (req, res, next) => {
  try {
    ejs.renderFile("templates/about.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

app.get('/demo', (req, res, next) => {
  try {
    ejs.renderFile("templates/demo.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

app.get('/install', (req, res, next) => {
  try {
    ejs.renderFile("templates/install.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

app.get('/generate', (req, res, next) => {
  try {
    ejs.renderFile("templates/generate.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})


const generateRandomString = (myLength) => {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    {length: myLength},
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

app.post('/gib/link/', jsonParser, async (req, res, next) => {
  /**
   * Create a gib link for the supplied url and return a redemption url to send to someone
   * the request body should consist of json with the following fields
   * @field "linkUrl" with the url you wish to create a link for
   * @returns json with a "redemptionUrl" field defined. Send this link to another user to redeem
   * the link through gib
   */

  const linkAmount = req.body.linkAmount || 10

  const fundsUsername = generateRandomString(10)
  const fundsPassword = generateRandomString(20)
  try {
    await interledger.createUser(fundsUsername, fundsPassword)
    await interledger.transferFunds(enviroment.getInterledgerRsFundsUsername(), enviroment.getInterledgerRsFundsPassword(), addressFromUsername(fundsUsername), linkAmount)



    const link = await models.Link.create({
      linkUrl: req.body.linkUrl,
      fundsAccountUsername: fundsUsername,
      fundsAccountPassword: fundsPassword,
    })
    res.json({
      redemptionUrl: `${enviroment.getRedemptionBaseUrl()}/gib/link/${link.id}/redeem.html`
    })

  } catch (err) {
    next(err)
  }
})

app.get('/gib/link/:linkId/redeem.html', async (req, res, next) => {
  /**
   * Page to redeem the url with :linkId
   * @param linkId the link id generated though /gib/link/ endpoint
   * @returns an html displaying a page that installs a service worker and links to the appropriate
   * page
   * TODO: We should add a backend stored hash parameter so users can't try random ints for linkId
   */
  try {
    const link = await models.Link.findByPk(req.params.linkId)
    const data = {
      linkUrl: link.linkUrl,
      linkId: link.id
    }
    const options = {}
    ejs.renderFile("templates/redirect.html", data, options, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
});

app.post('/gib/link/:linkId/stream', jsonParser, async (req, res, next) => {
  try {
    const link = await models.Link.findByPk(req.params.linkId)
    const balance = await interledger.getBalance(link.fundsAccountUsername)
    if (balance.data.balance <= 0) {
      res.sendStatus(400).send("Insufficient Funds")
    }
    console.log(balance)
    const receiverAddress = req.body.receiverAddress
    interledger.transferFunds(
      link.fundsAccountUsername,
      link.fundsAccountPassword,
      receiverAddress,
      1
    )

    return res.send("")
  } catch (err) {
    next(err)
  }

})


app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
