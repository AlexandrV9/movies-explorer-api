const { Movie } = require('../models/Movie');
const {
  badRequestError,
  notFoundMovieError,
  forbiddenMovieDeleteError,
} = require('../utils/utils');

const {
  textFilmWasCreated,
} = require('../utils/constants');

exports.getAllMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie
    .find({owner: userId})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner = req.user._id,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => res.status(201).send(movie))
    .catch(() => next(badRequestError));
};

exports.deleteMovieById = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Movie
  .findById(id)
  .orFail(() => notFoundMovieError)
  .then((movie) => {
  const ownerId = movie.owner.toString();
  if (ownerId === userId) {
    return movie
      .remove()
      .then(() => res.status(200).send({ message: textFilmWasCreated }));
  }
  throw forbiddenMovieDeleteError;
  })
  .catch((err) => next(err));
};
