const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const captionSchema = new Schema({
  videoId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Video",
  },
  captionKey: {
    type: String,
    required: true,
    minlength: 1,
  },
  label: {
    type: String,
    default: "English",
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model("Captions", captionSchema);