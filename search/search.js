'use strict';

const express = require('express');
const router = express.Router();
const logger = require('winston');

//YELP API STUFF
const authModel = require('./model');
const request = require('request');
const YELP_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';

//TODO: get personalized search options
//TODO: move search option logic to different module
  let searchOptions = {
    url: YELP_SEARCH_URL,
    headers: {
      'Authorization': 'Bearer ' + authModel.authBearerToken
    },
    qs: {
      term: 'lunch',
      location: 10280,
      radius: 1000
    },
    timeout: 5000
  };



router.get('/', (req, res) => {
  logger.info('Someone is asking about lunch options!');

  //TODO: Remove this hack, updated authBearerToken when configuration data is updated
  searchOptions.headers['Authorization'] = 'Bearer ' + authModel.authBearerToken;
  request(searchOptions, (error, yelpResponse, body) => {
    if (error) {
      //TODO: Implement retry
      logger.error("Unable to get lunch data:" + error);
      // TODO: return better error response
      return;
    }
    const responseObj = JSON.parse(body);

    //TODO: Process response, based on user preferences, external conditions
    // in different module
    logger.info(`Lunch data came back! ${JSON.stringify(responseObj)}`);
    res.json(responseObj);
  });
});

module.exports = router;
