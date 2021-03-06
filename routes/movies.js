const express = require('express');

const moviesRoutes = express.Router();

const {
  getAllMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  valReqCreateMovie,
  valReqMovieId,
} = require('../validation-request/validation-request');

moviesRoutes.get('/', getAllMovies);
moviesRoutes.post('/', createMovie);
moviesRoutes.delete('/:id', valReqMovieId, deleteMovieById);

module.exports = moviesRoutes;
