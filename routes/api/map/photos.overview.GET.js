const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Photo = require('../../../models/Photo');
const User = require('../../../models/User');
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');

// @route get api/photo
// @desc get photos for an infinite scroll
// @access Public

router.post('/', async (req, res) => {

	try {
		
		const output = [];
        const bounds = req.body.bounds;

		const photos = await Photo.find();
		
		photos.forEach(photo => {
			if (Math.abs(photo.lngLat.lat) < Math.abs(bounds._ne.lat) &&
				Math.abs(photo.lngLat.lat) > Math.abs(bounds._sw.lat) &&
				Math.abs(photo.lngLat.lng) > Math.abs(bounds._ne.lng) &&
				Math.abs(photo.lngLat.lng) < Math.abs(bounds._sw.lng)) {
					output.push(photo);
				}
		});

		res.json(output);

	} catch (error) {
		console.error('error getting photos information from Mongo', error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
