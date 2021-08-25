const allowedCors = [
  'http://movies.explorer.alexv.nomoredomains.club/',
  'http://movies.explorer.alexv.nomoredomains.club',
  'http://localhost:3000',
];

const {
  DEFAULT_ALLOWED_METHODS,
} = require('../utils/constants');

const processingCorsRequests = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;

  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send();
  }
  next();
};

module.exports = {
  processingCorsRequests,
};
