const Joi = require('joi');

// user registration Validation
const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': '"username" must be at least 3 characters long',
      'string.max': '"username" cannot be more than 30 characters',
      "any.required": `"username" is a required field`,
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '"Email" must be a valid email address',
      'any.required': '"Email" is a required field',
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': '"Password" must be at least 8 characters long',
      'any.required': '"Password" is a required field',
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': '"Confirm Password" must match the "Password"',
      'any.required': '"Confirm Password" is a required field',
    }),
});


//login for Validation

const loginValidatin = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address.',
      'string.empty': 'Email is required.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
    }),
})
module.exports = { registerValidation, loginValidatin };