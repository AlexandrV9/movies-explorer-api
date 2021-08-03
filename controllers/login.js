const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const {
  incorrectEmailOrPassword,
  generateAccessToken,
} = require('../utils/utils');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw incorrectEmailOrPassword;
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) {
        throw incorrectEmailOrPassword;
      }

      return generateAccessToken(user._id);
    })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production',
      });
      res.status(200).send({ message: 'Вы авторизовались!' });
    })
    .catch((err) => next(err));
};
