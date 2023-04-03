const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { env } = require('../util/constants');

const roomSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  watchers: [{
    type: Schema.Types.ObjectId,
    required: false,
  }],
  videoId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Videos',
  }
});

module.exports = mongoose.model("theatreRooms", roomSchema);