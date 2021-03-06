const validator = require('validator');

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },

  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },

  owner: {
    type: mongoose.ObjectId,
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

  isLike: {
    type: Boolean,
  },

});

exports.Movie = mongoose.model('movie', movieSchema);
