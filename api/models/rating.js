const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  videoId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Videos",
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model("Ratings", ratingSchema);