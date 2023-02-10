const Joi = require('joi');

campusValidation = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'string.empty': 'Please enter the campus name' }),
  location: Joi.string()
    .required()
    .messages({ 'string.empty': 'Please enter the campus location' }),
  description: Joi.string().allow('', null),
});

const validateCampus = (req, res, next) => {
  const { error } = campusValidation.validate(req.body);
  if (error) {
    res.status(400);
    console.log(error);
    const message = error.details[0].message;
    throw new Error(message);
  } else {
    next();
  }
};

module.exports = validateCampus;
