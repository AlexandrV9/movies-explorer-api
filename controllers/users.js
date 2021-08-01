const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const {
  conflictError,
  notFoundUserError,
} = require('../utils/utils');

exports.getUserInfo = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => notFoundUserError)
    .then((user) => res.send(user))
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
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(conflictError);
      }
      next();
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
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
