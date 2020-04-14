const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  url: {
    type: String,
    required: true,
  },
  userName: String,
  title: String,
  description: String,
  camera: String,
  focalLength: String,
  shutterSpeed: String,
  ISO: String,
  keywords: [String],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      avatar: String,
      name: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review = mongoose.model('photo', PhotoSchema);
