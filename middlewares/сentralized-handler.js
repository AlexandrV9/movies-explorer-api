const {
  textServerError,
} = require('../utils/constants');

exports.centralizedHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? textServerError
        : message,
    });
  next();
};
