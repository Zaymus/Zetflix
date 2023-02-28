const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const commentSchema = new Schema({
  author: creatorSchema,
  message: {
    type: String,
    required: true,
    minlength: 1,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  videoId: {
    type: ObjectId,
    ref: "Videos",
    required: true,
  },
  parentCommentId: {
    type: ObjectId,
    ref: "Comments",
    required: false,
  }
});

module.exports = mongoose.model("Comments", commentSchema);