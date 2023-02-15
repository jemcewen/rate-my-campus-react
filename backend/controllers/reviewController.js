const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Campus = require('../models/campusModel');

const createReview = asyncHandler(async (req, res) => {
  const campus = await Campus.findById(req.params.id);
  if (!campus) {
    res.status(400);
    throw new Error('Campus not found');
  }
  const review = await new Review({ ...req.body });
  review.author = req.user._id;
  campus.reviews.push(review);
  await review.save();
  await campus.save();
  res.status(200).json(review);
});

module.exports = {
  createReview,
};
