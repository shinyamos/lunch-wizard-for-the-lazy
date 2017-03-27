/**
 * Created by ahunt on 3/16/17.
 */
'use strict';
const request = require('request');
const authModel = require('./model');
const logger = require('winston');
const configOptions = require('../config').configOptions;

const YELP_API_URL = 'https://api.yelp.com/oauth2/token';
const GRANT_TYPE = 'client_credentials';

function updateAuth() {
  const client_id = configOptions.client_id.value;
  const client_secret =  configOptions.client_secret.value;

  request.post({
      url: YELP_API_URL,
      form: {
        grant_type: GRANT_TYPE,
        client_id: client_id,
        client_secret: client_secret
      }
    },
    handleAuthResponse
  );
}

function handleAuthResponse(error, response, body) {
  if (error) {
    //TODO: Implement retry
    logger.error("Failed to get OAUTH2 bearer token msg:" + error);
    return;
  }
  const responseObj = JSON.parse(body);
  //TODO: Validate scheme of response
  authModel.authBearerToken = responseObj.access_token;
  logger.info(`Bearer token received ${responseObj.access_token}`);
  logger.info(`Bearer token expires in ${responseObj.expires_in}`);
}

module.exports = {updateAuth};