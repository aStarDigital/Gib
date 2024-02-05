/**
 * Server.js
 * ---------
 * Receives incoming requests and then responds by either rendering an appropriate page or performing actions on our database.
 */

/** Internal dependencies */
// const models = require('../models')
// const enviroment = require('../environment')
// const interledger = require('../interledger-api')

/** External dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');

//var path = __dirname + '/templates/'
var jsonParser = bodyParser.json() // convenience to parse a JSON response

const app = express();
const port = 4000;


app.use('/public', express.static('public')) // Serve static assets like the explainer video and service worker from the `/public` folder.
//app.user(reload(path))
app.set('view engine', 'ejs'); // Use EJS as the templating engine

// TODO: Needs meeting. Good practice to have these CORS headers set. These might not be specific enough for our general use case.
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// TODO: Look into this.
// app.use(bodyParser.urlencoded({
//   extended: true
// }))

/** 
 * Returns a simple payments pointer account address from a given user name
 * @returns {string} The SPSP account address for the given username.
 * @todo Review SPSP
 */
// function addressFromUsername(username) {
//   return "http://localhost:7770/accounts/" + username + "/spsp"
// }

/** Renders the index template for the site at the `/` route. */
app.get('/', (req, res, next) => {
  try {
    ejs.renderFile("templates/index.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

/** Renders the about template for the site at the `/about` route. */
app.get('/about', (req, res, next) => {
  try {
    ejs.renderFile("templates/about.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

/** Renders the demo template for the site at the `/demo` route. */
app.get('/demo', (req, res, next) => {
  try {
    ejs.renderFile("templates/demo.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

/** Renders the install template for the site at the `/install` route. */
// app.get('/install', (req, res, next) => {
//   try {
//     ejs.renderFile("templates/install.html", {}, {}, function (err, str) {
//       return res.send(str)
//     });
//   } catch (err) {
//     next(err)
//   }
// })

/** Renders the generate template for the site at the `/generate` route. */
app.get('/generate', (req, res, next) => {
  try {
    ejs.renderFile("templates/generate.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

/** Renders the feedback template for the site at the `/feedback` route. */
app.get('/feedback', (req, res, next) => {
  try {
    ejs.renderFile("templates/feedback.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

/** Renders the privacy template for the site at the `/privacy` route. */
app.get('/privacy', (req, res, next) => {
  try {
    ejs.renderFile("templates/privacy.html", {}, {}, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
})

/** 
 * Generates a random alphanumeric string given a desired length.
 * Used in the link generation process, see POST request to `/gib/link/`.
 * @param {number} myLength - The length of the desired output string.
 * @returns {string} A randomized alphanumeric string of the given length.
 */
// const generateRandomString = (myLength) => {
//   const chars =
//     "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
//   const randomArray = Array.from(
//     {length: myLength},
//     (v, k) => chars[Math.floor(Math.random() * chars.length)]
//   );

//   const randomString = randomArray.join("");
//   return randomString;
// };

/**
 * Create a gib link for the supplied url and return a redemption url to send to someone
 * the request body should consist of json with the following fields
 * @param req.body.linkUrl - The url you wish to create a link for.
 * @param req.body.linkAmount - The amount of time to be allotted for access on the link.
 * @returns res.redemptionUrl - The redemption URL to be sent with Gib funds attached
 */
// app.post('/gib/link/', jsonParser, async (req, res, next) => {
//   const linkAmount = req.body.linkAmount || 10

//   const fundsUsername = generateRandomString(10)
//   const fundsPassword = generateRandomString(20)
//   try {
//     await interledger.createUser(fundsUsername, fundsPassword)
//     await interledger.transferFunds(enviroment.getInterledgerRsFundsUsername(), enviroment.getInterledgerRsFundsPassword(), addressFromUsername(fundsUsername), linkAmount)



//     const link = await models.Link.create({
//       linkUrl: req.body.linkUrl,
//       fundsAccountUsername: fundsUsername,
//       fundsAccountPassword: fundsPassword,
//     })
//     res.json({
//       redemptionUrl: `${enviroment.getRedemptionBaseUrl()}/gib/link/${link.id}/redeem.html`
//     })

//   } catch (err) {
//     next(err)
//   }
// })

/**
 * Page to redeem the url with :linkId
 * @param req.params.linkId the linkId generated by the `/gib/link/` route.
 * @returns Redirect page that installs a service worker and links to the content creator's
 * web monetized page.
 * @todo We should add a backend stored hash parameter so users can't try random ints for linkId
 */
// app.get('/gib/link/:linkId/redeem.html', async (req, res, next) => {
//   try {
//     const link = await models.Link.findByPk(req.params.linkId)
//     const data = {
//       linkUrl: link.linkUrl,
//       linkId: link.id
//     }
//     const options = {}
//     ejs.renderFile("templates/redirect.html", data, options, function (err, str) {
//       return res.send(str)
//     });
//   } catch (err) {
//     next(err)
//   }
// });

/**
 * The function that transfers funds from the Gib wallet to the content creator's wallet.
 * Used in `demo.js` (included in `templates/demo.html`) on `document.ready`.
 * 
 * @param req.params.linkId - The linkId generated by the `gib/link` route.
 * @param req.body.receiverAddress The SPSP account address belonging to the content creator.
 */
// app.post('/gib/link/:linkId/stream', jsonParser, async (req, res, next) => {
//   try {
//     const link = await models.Link.findByPk(req.params.linkId)
//     const balance = await interledger.getBalance(link.fundsAccountUsername)
//     if (balance.data.balance <= 0) {
//       res.sendStatus(400).send("Insufficient Funds")
//     }
//     const receiverAddress = req.body.receiverAddress
//     interledger.transferFunds(
//       link.fundsAccountUsername,
//       link.fundsAccountPassword,
//       receiverAddress,
//       1
//     )

//     return res.send("")
//   } catch (err) {
//     next(err)
//   }

// })


app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
