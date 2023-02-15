const express = require('express');
const router = express.Router({ mergeParams: true });
const { createReview } = require('../controllers/reviewController');
const validateReview = require('../middleware/validation/validateReview');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, validateReview, createReview);

module.exports = router;
