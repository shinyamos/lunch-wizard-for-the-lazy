'use strict';
const logger = require('winston');
const argv = require('yargs').argv;

var exphbs = require('express-handlebars');

const server = require('./server');
const search = require('./search');
const config = require('./config');


//TODO: replace this whole noise with nconf and dotenv
const configOptions = config.configOptions;
config.setInitConfiguration(argv, process.env);

//TODO: Move to search module,
//get OAUTH2 bearer token from Yelp Fusion API
search.updateAuth();

const app = server.app;

//TODO: move to server module
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Landing page
app.get('/', function (req, res, next) {
  res.render('home', {
    showTitle: true
  });
});

//TODO: Add logging for all requests here
logger.info("started up, woot!");

app.listen(configOptions.port.value, configOptions.host.value, function () {
  logger.info(`Server ${configOptions.host.value} running on port ${configOptions.port.value}`);
}).on('error', function (err) {
  logger.error(`Error: ${err.errno}\n${err.message}`);
});
