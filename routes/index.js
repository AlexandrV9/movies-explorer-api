const routes = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { auth } = require('../middlewares/auth');
const {
  textLoggedOut,
} = require('../utils/constants');

const {
  valReqCreateUser,
  valReqLogin,
} = require('../validation-request/validation-request');

const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');

routes.post('/signup', valReqCreateUser, createUser);
routes.post('/signin', valReqLogin, login);

routes.use('/users', auth, usersRoutes);
routes.use('/movies', auth, moviesRoutes);

routes.post('/signout', auth, (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: textLoggedOut });
});

module.exports = routes;
