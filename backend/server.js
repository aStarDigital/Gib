// server.js
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models')

var jsonParser = bodyParser.json()

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: false}));

app.post('/gib/link/', jsonParser, async (req, res) => {
  //endpoint for creating a new link
  const link = await models.Link.create({
    linkUrl: req.body.linkUrl,
    userId: req.body.userId
  })
  res.json({
    redemptionUrl: `localhost:4000/gib/link/${link.id}/redeem/`
  })
});

app.get('/gib/link/:linkId/redeem/', async (req, res) => {
  //endpoint for forwarding user to linked site
  const link = await models.Link.findByPk(req.params.linkId)

  // return json with link for testing purposes
  res.json({
    forwardTo: link.linkUrl
  })
  //res.redirect(301, link.linkUrl);
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
