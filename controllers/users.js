const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const {
  conflictError,
  notFoundUserError,
} = require('../utils/utils');

const {
  textMongoError,
} = require('../utils/constants');

exports.getUserInfo = (req, res, next) => {
  // const token = req.cookies.jwt;
  User
    .findById(req.user._id)
    .orFail(() => notFoundUserError)
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => next(err));
};

exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === textMongoError && err.code === 11000) {
        next(conflictError);
      }
      next(err);
    });
};

exports.updateUserProfile = (req, res, next) => {
  const inputData = req.body;
  User
    .findByIdAndUpdate(req.user._id, inputData,
      {
        new: true,
        runValidators: true,
      })
    .orFail(() => notFoundUserError)
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === textMongoError && err.code === 11000) {
        next(conflictError);
      }
      next(err);
    });
};
