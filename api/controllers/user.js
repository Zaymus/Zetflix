const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.postCreate = async(req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    User.verifyUsername(username);
    User.verifyEmail(email);
    User.verifyPassword(password);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const userEmail = await User.find({email: email});
    const userDispName = await User.find({username: username});

    if (userEmail.length > 1) {
      const error = new Error("Email address is already in use. Please use another one.");
      error.statusCode = 400;
      await User.deleteOne({_id: user._id});
      throw error;
    }

    if (userDispName.length > 1) {
      const error = new Error("Username is already in use. Please use another one.");
      error.statusCode = 400;
      await User.deleteOne({_id: user._id});
      throw error;
    }

    res.status(201).json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getById = async(req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error(`Could not find a user with the given id.`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.patchUpdate = async(req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;

  const updateDoc = {
    $set: {
      username: username,
      email: email
    }
  };

  try {
    const result = await User.updateOne({_id: req.user.userId}, updateDoc);
    var message = "";
    if (!result.matchedCount) {
      const error = new Error('Could not find user in database. Please try again later');
      error.statusCode = 500;
      throw error;
    }

    if (!result.modifiedCount) {
      message = "User information has been saved.";
    } else  {
      message = "User information has been saved and updated.";
    }

    res.status(200).json({message});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.deleteUser = async(req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) {
      const error = new Error(`Could not find a user with the given id.`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({message: "User has been successfully deleted."});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}