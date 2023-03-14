const Video = require('../models/video');
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

    const bucketParams = {
      Bucket: env.S3_BUCKET_NAME,
      Key: video.videoKey,
    };

    const metadata = await s3.headObject(bucketParams).promise();

    const videoSize = metadata.ContentLength;
    var CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    bucketParams.Range = `bytes=${start}-${end}`;
    res.writeHead(206, headers);
    s3.getObject(bucketParams).createReadStream().pipe(res);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.patchVideo = async (req, res, next) => {
  const videoId = req.params.videoId;
  const title = req.body.title;
  const description = req.body.description;

  const updateDoc = {
    $set: {
      title: title,
      description: description,
    },
  }

  try {
    const result = await Video.updateOne({$and: [{_id: videoId}, {userId: req.user.userId}]}, updateDoc);

    if (!result.matchedCount) {
      const error = new Error('Could not find video');
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({message: "Changes have been successfully updated"});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.deleteVideo = async (req, res, next) => {
  const videoId = req.params.videoId;
  const userId = req.user.userId;

  try {
    const video = await Video.findById(videoId);

    const params = {
      Bucket: env.S3_BUCKET_NAME,
      Key: video.videoKey,
    };

    const result = await Video.deleteOne({$and: [{_id: videoId}, {'creator.userId': userId}]});

    if(!result.deletedCount) {
      const video = await Video.findById(videoId);
      if (!video) {
        const error = new Error('Could not find video');
        error.statusCode = 404;
        throw error
      }

      const error = new Error('Only video creator can delete this video');
      error.statusCode = 400;
      throw error
    }

    await s3.deleteObject(params).promise();
    
    try {
      await s3.headObject(params).promise();
      const doc = new Video(video);
      doc.save();
      res.status(500).json({message: "Unable to delete video, please try again."})
    } catch (error) {
      if (error.statusCode == 404) {
        res.status(200).json({message: "Video has been successfully deleted."});
      } else {
        throw error;
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getVideo = async (req, res, next) => {
  const videoId = req.params.videoId;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      const error = new Error('Could not find video.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(video);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}