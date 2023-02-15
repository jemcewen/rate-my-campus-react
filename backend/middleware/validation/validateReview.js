const Joi = require('joi');

reviewValidation = Joi.object({
  body: Joi.string()
    .required()
    .messages({ 'string.empty': 'Please enter a review' }),
  rating: Joi.number().min(0).max(5).required().messages({
    'number.base': 'Please enter a rating',
    'number.min': 'Rating cannot be less than 0',
    'number.max': 'Rating cannot be greater than 5',
  }),
});

const validateReview = (req, res, next) => {
  const { error } = reviewValidation.validate(req.body);
  if (error) {
    res.status(400);
    const message = error.details[0].message;
    throw new Error(message);
  } else {
    next();
  }
};

module.exports = validateReview;
