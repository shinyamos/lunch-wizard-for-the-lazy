'use strict';

const auth = require('./auth.js');
const search = require('./search.js');

module.exports = {
  updateAuth: auth.updateAuth,
  router: search.router
};
