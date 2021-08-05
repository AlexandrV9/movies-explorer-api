const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rate-limit');

require('dotenv').config();

const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { processingCorsRequests } = require('./middlewares/cors-request');
const { centralizedHandler } = require('./middlewares/сentralized-handler');

const {
  notFoundRouteError,
} = require('./utils/utils');

const app = express();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log('Conntected to mestodb');

  await app.listen(PORT);

  console.log(`Server listen on ${PORT}`);
}

main();

app.use(requestLogger);
app.use(processingCorsRequests);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', limiter, routes);

app.use((req, res, next) => {
  next(notFoundRouteError);
});

app.use(errorLogger);
app.use(errors());
app.use(centralizedHandler);
