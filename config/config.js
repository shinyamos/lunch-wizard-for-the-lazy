'use strict';
//TODO: replace this whole noise with nconf and dotenv
let commandLineArgs;
let environmentVars;

const configOptions = {
  host:  {id: "HOST", default: 'localhost', description: 'Name of host'},
  port:  {id: "PORT", default: 3000, description: 'Port server listens on'},
  client_id: {id: "YELP_CLIENT_ID", default: '', description: ''},
  client_secret: {id: "YELP_CLIENT_SECRET", default: '', description: ''}
};

function setInitConfiguration(argv, processEnv) {
  commandLineArgs = argv;
  environmentVars = processEnv;
  configOptions.host['value'] = getStringConfig(commandLineArgs, environmentVars, configOptions.host);
  configOptions.port['value'] = getNumericConfig (commandLineArgs, environmentVars, configOptions.port);
  configOptions.client_id['value'] = getStringConfig(commandLineArgs, environmentVars, configOptions.client_id);
  configOptions.client_secret['value'] =  getStringConfig(commandLineArgs, environmentVars, configOptions.client_secret);
}

function getStringConfig (commandLineArgs, environmentVars, configData) {
  const stringResponse = commandLineArgs[configData.id] || environmentVars[configData.id] || configData.default;
  return stringResponse;
}

function getNumericConfig (commandLineArgs, environmentVars, configData) {
  const numericResponse  = getStringConfig(commandLineArgs, environmentVars, configData);
  return Number(numericResponse);
}

module.exports = {setInitConfiguration, configOptions};
