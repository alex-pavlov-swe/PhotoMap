const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Photo = require('../../models/Photo');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route get api/photo
// @desc get photos for an infinite scroll
// @access Public

router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();

    res.json(photos);
  } catch (error) {
    console.error('error getting photos information from Mongo', error.message);
    res.status(500).send('Server Error');
  }
});

// @route   Post api/photo
// @desc    Create or update user photo
// @access  Private
router.post(
  '/',
  [auth, [check('url', 'URL is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const {
      url,
      title,
      description,
      camera,
      focalLength,
      shutterSpeed,
      ISO,
      keywords,
    } = req.body;

    // Build photo object
    const photoFields = {};

    photoFields.user = req.user.id;

    if (url) photoFields.url = url;
    if (title) photoFields.title = title;
    if (description) photoFields.description = description;
    if (camera) photoFields.camera = camera;
    if (focalLength) photoFields.focalLength = focalLength;
    if (shutterSpeed) photoFields.shutterSpeed = shutterSpeed;
    if (ISO) photoFields.ISO = ISO;
    if (keywords) photoFields.keywords = keywords;

    try {
      /*
      let photo = await photo.findOne({ user: req.user.id });
      if (photo) {
        // Update existing photo
        photo = await photo.findOneAndUpdate(
          { user: req.user.id },
          { $set: photoFields },
          { new: true }
        );

        return res.json(photo);
      }
      */
      let photo = new Photo(photoFields);

      await photo.save();

      res.json(photo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;