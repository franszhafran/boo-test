'use strict';

const express = require('express');
const router = express.Router();
const profileController = require('../app/profile/controller')
const voteControllers = require('../app/vote/controller')

module.exports = function() {
  router.post('/profiles', profileController.createProfile.validation, profileController.createProfile.controller);

  router.get('/votes/:user_id', voteControllers.getVotes.controller);
  router.post('/votes', voteControllers.createVote.validation, voteControllers.createVote.controller);
  router.post('/votes/like', voteControllers.likeVote.validation, voteControllers.likeVote.controller);
  router.post('/votes/unlike', voteControllers.unlikeVote.validation, voteControllers.unlikeVote.controller);

  return router;
}

