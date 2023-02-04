const Joi = require('joi');

campusValidation = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string(),
});

const validateCampus = (req, res, next) => {
  const { error } = campusValidation.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400);
    const message = error.details.map((err) => err.message).join(',');
    throw new Error(message);
  } else {
    next();
  }
};

module.exports = validateCampus;
