const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Photo = require('../../models/Photo');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route get api/photo/:id
// @desc get selected photo
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.find({ _id: req.params.id });
    res.json(photo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

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
      imageName,
      lngLat,
      name,
      avatar,
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
    if (imageName) photoFields.imageName = imageName;
    if (lngLat) photoFields.lngLat = lngLat;
    if (name) photoFields.name = name;
    if (avatar) photoFields.avatar = avatar;
    if (title) photoFields.title = title;
    if (description) photoFields.description = description;
    if (camera) photoFields.camera = camera;
    if (focalLength) photoFields.focalLength = focalLength;
    if (shutterSpeed) photoFields.shutterSpeed = shutterSpeed;
    if (ISO) photoFields.ISO = ISO;
    if (keywords) photoFields.keywords = keywords;

    try {

      let photo = await photo.findOne({ user: req.user.id });
      if (photo) {
        // Update existing photo
        photo = await photo.findOneAndUpdate(
          { user: req.user.id },
          { $set: photoFields },
          { new: true }
        );
      } else {
        // Create a new one
        let photo = new Photo(photoFields);

        await photo.save();
      }

      res.json(photo);

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/photo/:id
// @desc    Delete a photo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    photo = await Photo.findById(req.params.id);

    if (photo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    await photo.remove();

    res.json({ msg: 'The photo has been removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
