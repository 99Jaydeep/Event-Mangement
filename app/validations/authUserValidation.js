const Joi = require('joi');

const validateUserSchema = Joi.object().keys({
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .messages({
        'string.base': `Name should be a type of string`,
        'string.min': `Name should have a minimum length of 5 characters`,
        'string.max': `Name cannot exceed 50 characters`,
        'string.empty': `Name is not an empty field`,
        'any.required': `Name is a required field`,
      }),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .min(5)
      .max(50)
      .required()
      .messages({
        'string.base': `Email should be a type of string`,
        'string.email': `Email format not valid`,
        'string.min': `Email should have a minimum length of 5 characters`,
        'string.max': `Email cannot exceed 50 characters`,
        'string.empty': `Email is not an empty field`,
        'any.required': `Email is a required field`,
      }),
    password: Joi.string()
      .min(6)
      .max(150)
      .required()
      .messages({
        'string.base': `Password should be a type of string`,
        'string.min': `Password should have a minimum length of 6 characters`,
        'string.max': `Password cannot exceed 150 characters`,
        'string.empty': `Password is not an empty field`,
        'any.required': `Password is a required field`,
      }),
    phone_number: Joi.string()
      .length(10)
      .required()
      .messages({
        'string.base': `Phone number should be a type of string`,
        'string.length': `Phone number should have a length of 10 characters`,
        'string.empty': `Phone number is not an empty field`,
        'any.required': `Phone number is a required field`,
      }),
    profile_image: Joi.string(),
    status: Joi.string()
      .valid('active', 'deactive')
      .required()
      .messages({
        'string.base': `Status should be a type of string`,
        'any.only': `Status must be active or deactive`,
        'string.empty': `Status is not an empty field`,
        'any.required': `Status is a required field`,
      }),
    role: Joi.string()
      .valid('user', 'admin', 'organization')
      .required()
      .messages({
        'string.base': `Role should be a type of string`,
        'any.only': `Role must be user, admin, or organization`,
        'string.empty': `Role is not an empty field`,
        'any.required': `Role is a required field`,
      }),
    created_at: Joi.date(),
    updatedAt: Joi.date(),
  });
  
  const loginValidation = Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .empty()
      .required()
      .messages({
        'string.base': `Email should be a type of string`,
        'string.email': `Email format not valid`,
        'string.empty': `Email is not an empty field`,
        'any.required': `Email is a required field`,
      }),
    password: Joi.string()
      .empty()
      .required()
      .messages({
        'string.base': `Password should be a type of string`,
        'string.empty': `Password is not an empty field`,
        'any.required': `Password is a required field`,
      }),
  });

 module.exports = {
  loginValidation,
  validateUserSchema
};
