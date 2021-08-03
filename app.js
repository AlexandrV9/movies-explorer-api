const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

require('dotenv').config();

// routes
const routes = require('./routes/index');

// controllers
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');

// middlewares
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { processingCorsRequests } = require('./middlewares/cors-request');
const { centralizedHandler } = require('./middlewares/сentralized-handler');

const {
  valReqCreateUser,
  valReqLogin,
} = require('./validation-request/validation-request');

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
  // eslint-disable-next-line no-console
  console.log('Conntected to mestodb');

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`Server listen on ${PORT}`);
}

main();

app.use(requestLogger);
app.use(processingCorsRequests);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', valReqCreateUser, createUser);
app.post('/signin', valReqLogin, login);

app.use(cookieParser());
app.use('/', auth, routes);

app.use((req, res, next) => {
  next(notFoundRouteError);
});

app.use(errorLogger);

app.use(errors());

app.use(centralizedHandler);
