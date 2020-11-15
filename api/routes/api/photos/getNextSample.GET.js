const express = require('express');
const router = express.Router();
const Photo = require('../../../models/Photo');

// @route get api/photos/next
// @desc get random photos for the feed
// @access Public
router.get('/next', async (req, res) => {
	try {
        //const photos = 
        /*await Photo.aggregate(
            [{ $sample: { size: 3 } }]
        );
        const photos = await Photo.find();
        */
       const photos = await Photo.find({ user: req.params.user_id });
       res.json(photos);
	} catch (error) {
		console.error('error getting photos information from Mongo', error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
