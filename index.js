'use strict';
const logger = require('winston');
const argv = require('yargs').argv;

const server = require('./server');
const search = require('./search');
const config = require('./config');

//TODO: replace this whole noise with nconf and dotenv
const configOptions = config.configOptions;
config.setInitConfiguration(argv, process.env);

//TODO: Move to serach module,
//TODO: Change behavior to listen for update event on configOptions
//get OAUTH2 bearer token from Yelp Fusion API
search.updateAuth();

const app = server.app;
//TODO: Add logging for all requests here

logger.info("started up, woot!");

app.listen(configOptions.port.value, configOptions.host.value, function () {
  logger.info(`Server ${configOptions.host.value} running on port ${configOptions.port.value}`);
}).on('error', function (err) {
  logger.error(`Error: ${err.errno}\n${err.message}`);
});
