const Video = require('../models/video');
const Captions = require('../models/caption');
const { Readable } = require('stream');
const { s3, env } = require('../util/constants');

exports.create = async (req, res, next) => {
  const videoId = req.query.videoId;
  try {
    const video = await Video.findById(videoId);

    if(!video) {
      const error = new Error('Could not find video.');
      error.statusCode = 404;
      throw error;
    }

    const caption = await Captions.create({
      videoId: videoId,
      captionKey: req.captionKey
    });

    res.status(201).json(caption);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getCaptions = async (req, res, next) => {
  const videoId = req.params.videoId;

  try {
    const tracks = await Captions.find({videoId: videoId});
    if(!tracks.length) {
      const error = new Error('Could not find caption tracks for this video.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(tracks);
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getByKey = async (req, res, next) => {
  const captionKey = req.query.captionKey;

  try {
    const caption = await Captions.findOne({captionKey: captionKey});

    if(!caption) {
      const error = new Error('Could not find caption with given key.');
      error.statusCode = 400;
      throw error;
    }

    const params = {
      Bucket: env.S3_BUCKET_NAME,
      Key: captionKey,
    }
    const data = await s3.getObject(params).promise();
    res.status(206).json({captions: data.Body.toString()});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}