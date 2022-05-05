const models = require('./models')
const enviroment = require('./environment')

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');



var jsonParser = bodyParser.json()

const app = express();
const port = 4000;

app.use('/public', express.static('public'))
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/gib/link/', jsonParser, async (req, res, next) => {
  /**
   * Create a gib link for the supplied url and return a redemption url to send to someone
   * the request body should consist of json with the following fields
   * @field "linkUrl" with the url you wish to create a link for
   * @returns json with a "redemptionUrl" field defined. Send this link to another user to redeem
   * the link through gib
   */
  try {
    const link = await models.Link.create({
      linkUrl: req.body.linkUrl,
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
      linkUrl: link.linkUrl
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
