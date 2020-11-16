const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Review = require('../../models/Review');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   GET api/reviews
// @desc    Get reviews for the current profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ profileId: req.params.id });

    res.json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/reviews/
// @desc    Write a post
// @access  Public
router.post('/', auth, async (req, res) => {
  try {
    const { profileId, text } = req.body;

    const newReview = new Review({
      user: req.user.id,
      name: req.body.userName,
      avatar: req.body.avatar,
      profileId: req.body.profileId,
      text: req.body.text
    });

    const review = await newReview.save();

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error!');
  }
});

// @route   DELETE api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    review = await Review.findById(req.params.id);

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    await review.remove();

    res.json({ msg: 'The review has been removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/reviews/like/:id
// @desc    Like a review
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check if the review has already been liked
    if (
      review.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Review already liked' });
    }

    review.likes.unshift({ user: req.user.id });

    await review.save();

    res.json(review.likes);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send('Server Error');
  }
});

// @route   PUT api/reviews/like/:id
// @desc    Unlike a review
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check if the review hasn't been liked yet
    if (
      review.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Review has not yet been liked' });
    }

    // Get remove index
    const removeIndex = review.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    review.likes.splice(removeIndex, 1);

    await review.save();

    res.json(review.likes);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send('Server Error');
  }
});

// @route   PUT api/reviews/comment/:id
// @desc    Comment on a review
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await Usrer.findById(req.user.id).select('-password');
      const review = await Review.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      review.comments.unshift(newComment);

      await review.save();

      res.json(review.comments);
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500).send('Server Error');
    }
  }
);

// @route   DELETE api/reviews/comment/:id/:comment_id
// @desc    Delete a comment on a review
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (res, req) => {
  try {
    const review = await Review.findById(req.params.id);

    const comment = review.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res(404).json({ msg: 'comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized ' });
    }

    // Get remove index
    const removeIndex = review.comments
      .map(comment => comment_id)
      .indexOf(req.params.comment_id);

    review.comments.splice(removeIndex, 1);

    await review.save();

    res.json(review.comments);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send('Server Error');
  }
});

// @route   GET api/review
// @desc    Get single review to view the comments
// @access  Public
router.get('/review/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    res.json(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
