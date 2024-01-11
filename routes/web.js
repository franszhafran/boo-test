'use strict';

const express = require('express');
const router = express.Router();
const model = require('../engine/model')
const profileController = require('../app/profile/controller')

module.exports = function() {
  router.get('/profiles/:user_id', profileController.showProfile.controller);

  return router;
}

