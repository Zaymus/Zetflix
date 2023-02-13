const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { env, userValidation } = require('../util/constants');

const userSchema = new Schema({
  avatarURL: {
    type: String,
    default: env.DEFAULT_AVATAR_KEY,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.statics.verifyUsername = (username) => {
  let isValidUsername = userValidation.USERNAME_FORMAT.test(username);

  if (!isValidUsername) {
    const error = new Error("Invalid Username. A valid username must be between 3 and 20 characters long, cannot have an _ or - at the beginning or end of the username and cannot contain repeating __ or -- within username.");
    error.statusCode = 400;
    throw error;
  }

  return true;
}

userSchema.statics.verifyEmail = (email) => {
  let isValidEmail = userValidation.EMAIL_FORMAT.test(email);

  if (!isValidEmail) {
    const error = new Error("Invalid email address.");
    error.statusCode = 400;
    throw error;
  }

  return true;
};

userSchema.statics.verifyPassword = (password) => {
  let isValidPassword = userValidation.PASSWORD_FORMAT.test(password);

  if (!isValidPassword) {
    const error = new Error("Invalid password. A valid password must contain an uppercase character, a number, and a symbol (!, @, #, $, %, ^, &, *).");
    error.statusCode = 400;
    throw error;
  }

  return true
};

module.exports = mongoose.model("User", userSchema);