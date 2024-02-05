const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// TODO: Look into this.
app.use(bodyParser.urlencoded({
  extended: true
}))

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

// app.listen(port, () => {
//   console.log(`Success! Your application is running on port ${port}.`);
// });

exports.app = onRequest(app);