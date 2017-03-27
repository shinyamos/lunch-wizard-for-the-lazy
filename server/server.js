'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('winston');
const search = require('../search/search.js');

const app = express();

app.use(bodyParser.json());
app.use((request, response, next) => {
  logger.info(request.headers);
  next()
});

app.use('/lunch', search);

// Log errors
app.use((error, request, response, next) => {
  logger.error(`ERROR DETECTED!! ${error}`)
  response.status(500).send(`Something broke, bummer! ==>${error}`)
})

module.exports = {app};
