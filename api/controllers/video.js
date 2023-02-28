const Video = require('../models/video');
const { Readable } = require('stream');
const { env, s3 } = require('../util/constants');

exports.postCreate = async (req, res, next) => {
  const videoKey = req.videoKey;
  const title = req.body.title;
  const description = req.body.description;

  try {
    const video = await Video.create({
      title: title,
      description: description,
      uploadDate: Date.now(),
      videoKey: videoKey,
      creator: req.user,
    });

    res.status(201).json({message: "Uploaded video successfully!", video: video});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    if (!videos) {
      const error = new Error('Could not retrieve videos.');
      error.status(500);
      throw error;
    }
    res.status(200).json(videos);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.streamVideo = async (req, res, next) => {
  const videoId = req.params.videoId;

  try {
    const video = await Video.findById(videoId);

    if(!video) {
      const error = new error("Could not find video.");
      error.status(404);
      throw error;
    }

    var range = req.headers.range;
    if (!range) {
      range = 'bytes=0-';
    }

    // const videoSize = data.ContentLength;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ''));
    const end = start + CHUNK_SIZE;
    console.log(start, end);
    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);

    const params = {
      Bucket: env.S3_BUCKET_NAME,
      Key: video.videoKey,
      Range: `bytes=${start}-${end}`
    }
    
    const data = await s3.getObject(params).promise();
    console.log(data);
    const stream = Readable.from(data.Body);
    stream.pipe(res);

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}