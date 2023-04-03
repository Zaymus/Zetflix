const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { env } = require('../util/constants');

const creatorSchema = new Schema({
  avatarKey: {
    type: String,
    required: true,
    default: env.DEFAULT_AVATAR_KEY
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  videoKey: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    default: env.DEFAULT_THUMBNAIL_KEY
  },
  creator: creatorSchema,
});

module.exports = mongoose.model("Videos", videoSchema);