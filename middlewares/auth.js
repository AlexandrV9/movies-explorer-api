const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

const {
  badRequestError,
  unauthorizedError,
} = require('../utils/utils');

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(unauthorizedError);
  } else {
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      next(badRequestError);
    }
    req.user = payload;
  }
  next();
};
