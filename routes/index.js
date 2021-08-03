const routes = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);
routes.post('/signout', (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'Вы вышли из системы' });
});

module.exports = routes;
