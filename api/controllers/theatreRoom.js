const TheatreRoom = require('../models/theatreRoom');
const Video = require('../models/video');
// const axios = require('axios');
const { env } = require('../util/constants');

exports.create = async (req, res, next) => {
  try {
    const room = await TheatreRoom.create({owner: req.user.userId});
    
    if(!room) {
      const error = new Error('Could not create theatre room.');
      error.statusCode = 500;
      throw error;
    }

    room.watchers.push(req.user.userId);
    await room.save();

    res.status(201).json(room);
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getTheatreRoom = async (req, res, next) => {
  const roomId = req.params.roomId;

  try {
    const room = await TheatreRoom.findById(roomId);

    if(!room) {
      const error = new Error('Could not find theatre room.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(room);
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.joinRoom = async (req, res, next) => {
  const roomId = req.params.roomId;

  try {

    const room = await TheatreRoom.findOne({_id: roomId, watchers: {$in: [req.user.userId]}});

    if(room) {
      const error = new Error('cannot join rooms multiple times.');
      error.statusCode = 400;
      throw error;
    }

    const result = await TheatreRoom.updateOne({_id: roomId},
       {$push: {watchers: req.user.userId}});

    if(!result.matchedCount) {
      const error = new Error('Could not find theatre room.');
      error.statusCode = 404;
      throw error;
    }

    if (!result.modifiedCount) {
      const error = new Error('Unable to join theatre room.');
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({message: "Successfully joined theatre room."});
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.leaveRoom = async (req, res, next) => {
  const roomId = req.params.roomId;

  try {
    var room = await TheatreRoom.findOne({_id: roomId, watchers: {$in: [req.user.userId]}});
    
    if(!room) {
      const error = new Error('Cannot leave a room you are not already in.');
      error.statusCode = 400;
      throw error;
    }

    const result = await TheatreRoom.updateOne({_id: roomId}, 
      {$pull: {'watchers': req.user.userId}});

    if(!result.matchedCount) {
      const error = new Error('Could not find theatre room.');
      error.statusCode = 404;
      throw error;
    }

    if (!result.modifiedCount) {
      const error = new Error('Unable to leave theatre room.');
      error.statusCode = 500;
      throw error;
    }

    var message = "Successfully left theatre room.";

    room = await TheatreRoom.findById(roomId);

    if (!room.watchers.length) {
      await room.delete();
    }

    res.status(200).json({message: message});
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.setVideo = async (req, res, next) => {
  const roomId = req.params.roomId;
  const videoId = req.query.video;

  try {
    var room = await TheatreRoom.findOne({$and: [{_id: roomId}, {owner: req.user.userId}]});

    if(!room) {
      const error = new Error('Cannot change video of someone else\'s room.');
      error.statusCode = 400;
      throw error;
    }

    const video = await Video.findById(videoId);

    if (!video) {
      const error = new Error('Could not find video.');
      error.statusCode = 404;
      throw error;
    }
    
    const result = await TheatreRoom.updateOne({_id: roomId}, {
      $set: {
        videoId: videoId,
      },
    });

    if (!result.matchedCount) {
      const error = new Error('Could not find theatre room.');
      error.statusCode = 404;
      throw error;
    }

    if (!result.modifiedCount) {
      const error = new Error('Unable to set video or requested video is already set.');
      error.statusCode = 500;
      throw error;
    }

    room = await TheatreRoom.findById(roomId);

    res.status(200).json(room);
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.startRoom = async (req, res, next) => {
  const roomId = req.params.roomId;

  try {
    const room = await TheatreRoom.findById(roomId);

    if (!room) {
      const error = new Error('Could not find room.');
      error.statusCode = 404;
      throw error;
    }

    // const result = await axios.get(`${env.BASE_URL}/api/video/${room.videoId}`);

    console.log(result);
    
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}