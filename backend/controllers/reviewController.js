const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Campus = require('../models/campusModel');

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ campus: req.params.id }).populate(
    'author',
    'name'
  );
  res.json(reviews);
});

const createReview = asyncHandler(async (req, res) => {
  const campus = await Campus.findById(req.params.id);
  if (!campus) {
    res.status(400);
    throw new Error('Campus not found');
  }
  const review = await new Review({ ...req.body });
  review.author = req.user._id;
  review.campus = campus.id;
  await review.save();
  res.status(200).json(review);
});

module.exports = {
  getReviews,
  createReview,
};
