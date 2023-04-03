const Comment = require('../models/comment');
const { commentRatingTypes } = require('../util/constants');

exports.create = async (req, res, next) => {
  const videoId = req.params.videoId;
  const message = req.body.message;
  const parentCommentId = req.query.parentCommentId;

  try {
    const comment = await Comment.create({
      author: req.user,
      videoId: videoId,
      message: message,
      parentCommentId: parentCommentId,
    });

    res.status(201).json({ message: "Comment successfully posted", comment: comment});
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getComments = async (req, res, next) => {
  const videoId = req.params.videoId;

  try {
    const comments = await Comment.find({videoId: videoId});

    if (comments.length == 0) {
      const error = new Error('No comments found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(comments);
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getReplies = async (req, res, next) => {
  const commentId = req.params.commentId;

  try {
    const comments = await Comment.find({parentCommentId: commentId});

    if (comments.length == 0) {
      const error = new Error('No comments found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(comments);
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.postRateComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const type = req.query.type;

  try {
    if (type !== commentRatingTypes.LIKE && type !== commentRatingTypes.DISLIKE) {
      const error = new Error('Invalid rating type');
      error.statusCode = 500;
      throw error;
    }

    var result;
    if (type === commentRatingTypes.LIKE) {
      result = await Comment.updateOne({_id: commentId}, {$inc: {likes: 1}});
    } else {
      result = await Comment.updateOne({_id: commentId}, {$inc: {dislikes: 1}});
    }

    if (!result.matchedCount) {
      const error = new Error("Could not find comment");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({message: "successfully added comment rating"});
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}