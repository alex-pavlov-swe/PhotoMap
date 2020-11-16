const express = require('express');
const router = express.Router();
const Photo = require('../../../models/Photo');

// @route get api/photos/:user_id
// @desc get all the photos if one user
// @access Public

router.get('/:user_id', async (req, res) => {
	try {
		const photos = await Photo.find({ user: req.params.user_id });
		res.json(photos);
	} catch (error) {
		console.error('error getting photos information from Mongo', error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
