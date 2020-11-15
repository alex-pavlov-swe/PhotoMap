const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      'name'
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile
// @desc    Get all existing profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email']);

    res.json(profiles);
  } catch (error) {
    console.error('error gettin profiles', error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get the profile by id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'email']);

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   Post api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const {
    name,
    location,
    description,
    facebook,
    instagram,
    youtube,
    web,
    avatar,
  } = req.body;

  // Build Profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (name) profileFields.name = name;
  if (location) profileFields.location = location;
  if (description) profileFields.description = description;
  if (avatar) profileFields.avatar = avatar;

  // Build Social object
  profileFields.social = {};
  profileFields.social.facebook = facebook ? facebook : '';
  profileFields.social.instagram = instagram ? instagram : '';
  profileFields.social.youtube = youtube ? youtube : '';

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing Profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    profile = new Profile(profileFields);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
