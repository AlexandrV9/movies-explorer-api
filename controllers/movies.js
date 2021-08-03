const { Movie } = require('../models/Movie');
const {
  badRequestError,
  notFoundMovieError,
  forbiddenMovieDeleteError,
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
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie
    .findById(movieId)
    .orFail(() => notFoundMovieError)
    .then((movie) => {
      const ownerId = movie.owner.toString();
      if (ownerId === userId) {
        movie.remove();
        res.send({ message: 'Карточка успешно удалена' });
      } else {
        throw forbiddenMovieDeleteError;
      }
    })
    .catch((err) => next(err));
};
