const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  textInvalidURLImage,
  textInvalidURLTrailer,
  textInvalidURLThumbnail,
} = require('../utils/constants');

const valReqCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.required(),
    year: Joi.number().integer(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.error(textInvalidURLImage);
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.error(textInvalidURLTrailer);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.error(textInvalidURLThumbnail);
    }),
    movieId: Joi.required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    isLike: Joi.boolean(),
  }),
});

const valReqMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
});

const valReqUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().hex().length(24),
  }),
});

const valReqUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }).or('name', 'email'),
});

const valReqCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const valReqLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  valReqCreateMovie,
  valReqMovieId,
  valReqUserId,
  valReqUpdateUserProfile,
  valReqCreateUser,
  valReqLogin,
};
