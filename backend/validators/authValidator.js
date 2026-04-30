const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  role: Joi.string().valid("student", "teacher").required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required()
});

module.exports = { signupSchema, loginSchema };