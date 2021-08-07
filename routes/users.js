const express = require('express');

const usersRoutes = express.Router();

const {
  getUserInfo,
  updateUserProfile,
} = require('../controllers/users');

const {
  valReqUserId,
  valReqUpdateUserProfile,
} = require('../validation-request/validation-request');

usersRoutes.get('/me', valReqUserId, getUserInfo);
usersRoutes.patch('/me', valReqUpdateUserProfile, updateUserProfile);

module.exports = usersRoutes;
