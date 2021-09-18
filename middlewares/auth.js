const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

const {
  unauthorizedError,
  invalidToken,
} = require('../utils/utils');

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  // const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(unauthorizedError);
  } else {
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      next(invalidToken);
    }
    req.user = payload;
  }
  next();
};
