const Video = require('../models/video');
const Rating = require('../models/rating');

exports.create = async (req, res, next) => {
  const videoId = req.params.videoId;
  const rating = req.body.rating;

  try {
    const video = await Video.findById(videoId);
    if(!video) {
      const error = new Error("Could not find video");
      error.statusCode = 404;
      throw error;
    }

    await Rating.create({
      videoId: videoId,
      rating: rating,
    });

    res.status(201).json({ message: "Successfully created rating"});
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getAverage = async (req, res, next) => {
  const videoId = req.params.videoId;

  try {
    const videoRatings = await Rating.find({videoId: videoId});
    var average = (videoRatings.map(rating => {
      return rating.rating;
    })
    .reduce((accumulator, current) => accumulator + current, 0)) / videoRatings.length;
  
    res.status(200).json({average: average, quantity: videoRatings.length});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err);    
  }
}