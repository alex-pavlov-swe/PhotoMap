const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Photo = require('../../../models/Photo');
const User = require('../../../models/User');
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');
const mapboxgl = require('mapbox-gl');

// @route get api/photo MOBILE
// @desc get photos for an infinite scroll
// @access Public

router.post('/', async (req, res) => {

    try {
        const output = [];

        var bounds = new mapboxgl.LngLatBounds(
            new mapboxgl.LngLat(parseFloat(req.body.bounds._sw.lng), parseFloat(req.body.bounds._sw.lat)),
            new mapboxgl.LngLat(parseFloat(req.body.bounds._ne.lng), parseFloat(req.body.bounds._ne.lat))
        );

        const photos = await Photo.find();

        photos.forEach(photo => {
            var photoLngLat = new mapboxgl.LngLat(parseFloat(photo.lngLat.lng), parseFloat(photo.lngLat.lat));
            if (bounds.contains(photoLngLat)) {
                output.push(photo);
            }
        });

        res.json(output);

    } catch (error) {
        console.error('error getting photos information from Mongo', error.message);
        res.status(500).send('Server Error');
    }
});

// @route get api/photo WEB
// @desc get photos for an infinite scroll
// @access Public

router.post('/web', async (req, res) => {
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
