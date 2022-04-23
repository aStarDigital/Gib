// server.js
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models')
const ejs = require('ejs');



var jsonParser = bodyParser.json()



const app = express();
const port = 4000;

app.use('/public', express.static('public'))
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/gib/link/', jsonParser, async (req, res, next) => {
  try {
    const link = await models.Link.create({
      linkUrl: req.body.linkUrl,
      userId: req.body.userId
    })
    res.json({
      redemptionUrl: `localhost:4000/gib/link/${link.id}/redeem/`
    })

  } catch (err) {
    next(err)
  }
})

app.get('/gib/link/:linkId/redeem.html', async (req, res, next) => {
  //endpoint for forwarding user to linked site
  try {
    const link = await models.Link.findByPk(req.params.linkId)
    const data = {
      linkUrl: "https://tyleralt.com"
    }
    const options = {}
    ejs.renderFile("templates/redirect.html", data, options, function (err, str) {
      return res.send(str)
    });
  } catch (err) {
    next(err)
  }
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
