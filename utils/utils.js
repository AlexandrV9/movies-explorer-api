const jwt = require('jsonwebtoken');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const badRequestError = new BadRequestError('Переданы некорректные данные');
const incorrectEmailOrPassword = new BadRequestError('Неправильные почта или пароль');
const notFoundUserError = new NotFoundError('Пользователь по указанному id не найден');
const notFoundMovieError = new NotFoundError('Фильм с указанным id не найден');
const notFoundRouteError = new NotFoundError('Маршрут не найден');
const forbiddenMovieDeleteError = new ForbiddenError('Это не ваш фильм, вы не можете его удалить');
const unauthorizedError = new UnauthorizedError('Чтобы пользоваться методами сервера, сначала пройдите авторизацию');
const conflictError = new ConflictError('Пользователь с такой почтой уже существует');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateAccessToken = (_id) => jwt.sign(
  { _id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' },
);

module.exports = {
  badRequestError,
  incorrectEmailOrPassword,
  notFoundUserError,
  notFoundMovieError,
  forbiddenMovieDeleteError,
  unauthorizedError,
  conflictError,
  notFoundRouteError,
  generateAccessToken,
};
