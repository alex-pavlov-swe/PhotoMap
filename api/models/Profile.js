const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: { type: String },
  location: { type: String },
  description: { type: String },
  social: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    web: { type: String },
  },
  avatar: { type: String },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'photo',
    },
  ],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
