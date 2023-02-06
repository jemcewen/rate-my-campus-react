const Joi = require('joi');

userValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400);
    const message = error.details.map((err) => err.message).join(',');
    throw new Error(message);
  } else {
    next();
  }
};

module.exports = validateUser;
