const express = require('express');
const router = express.Router();
const Photo = require('../../../models/Photo');

// @route   Post api/photo/like
// @desc    Create user photo
// @access  Private
router.post('/', [auth], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }

    const {
        photoId,
        userId
    } = req.body;

    try {
        let photo = await Photo.find({ _id: photoId });

        if (photo) {
            const photoFields = {};

            if (photo.likes.includes(userId)) {
                photoFields.likes = photo.likes.filter(id => id != userId);
            } else {
                photoFields.likes = photo.likes;
                photoFields.likes.push(userId);
            }
            photo = await Photo.findOneAndUpdate(
                { _id: photoId },
                { $set: photoFields },
                { new: true }
            );

            res.status(200).json(photo);
        } else {
            res.status(404).send("Photo not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
