const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: { type: String },
  title: { type: String },
  location: { type: String },
  experience: {
    type: String
  },
  regions: {
    type: String
  },
  location: {
    type: String
  },
  age: {
    type: Number
  },
  education: {
    type: String
  },
  social: {
    facebook: {
      type: String
    },
    vk: {
      type: String
    },
    instagram: {
      type: String
    },
    youtube: {
      type: String
    }
  },
  avatar: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
