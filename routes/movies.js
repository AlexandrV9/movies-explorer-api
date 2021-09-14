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
moviesRoutes.post('/', valReqCreateMovie, createMovie);
moviesRoutes.delete('/:id', deleteMovieById);

module.exports = moviesRoutes;
