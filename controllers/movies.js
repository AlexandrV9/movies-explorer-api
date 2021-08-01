const { Movie } = require('../models/Movie');
const {
  badRequestError,
  notFoundMovieError,
} = require('../utils/utils');

exports.getAllMovies = (req, res, next) => {
  Movie
    .find({})
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
  Movie.findByIdAndRemove(req.params.movieId)
    .orFail(() => notFoundMovieError)
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};
