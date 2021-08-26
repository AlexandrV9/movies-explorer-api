const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000,
  message: 'Вы отправили слишком много запросов, попробуйте позже',
});
