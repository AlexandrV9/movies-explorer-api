const { celebrate, Joi } = require('celebrate');

const regExp = /^((https:\/\/)|(http:\/\/))(www.)?(\w|\W)+/;

const valReqCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.required(),
    year: Joi.number().integer(),
    description: Joi.string().required(),
    image: Joi.string().regex(regExp).required(),
    trailer: Joi.string().regex(regExp).required(),
    thumbnail: Joi.string().regex(regExp).required(),
    movieId: Joi.required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const valReqMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

const valReqUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const valReqUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }).or('name', 'email'),
});

const valReqCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

const valReqLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// Другой способ валидации (пригодится в будущем)
// const handleValReqCreateCard = (message) => {
//   const validateShema = Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required(),
//     owner: Joi.string(),
//   });
//   return validateShema.validate(message);
// };

module.exports = {
  valReqCreateMovie,
  valReqMovieId,
  valReqUserId,
  valReqUpdateUserProfile,
  valReqCreateUser,
  valReqLogin,
};
