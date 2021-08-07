const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(eml) {
        return validator.isEmail(eml);
      },
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

exports.User = mongoose.model('user', userSchema);
