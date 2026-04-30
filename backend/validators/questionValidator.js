const Joi = require("joi");

const createQuestionSchema = Joi.object({
  title: Joi.string().required(),
  question_text: Joi.string().required(),
  topic: Joi.string().valid("Algebra", "Geometry").required(),
  level: Joi.string().valid("Sec1", "Sec2", "Sec3", "Sec4").required(),
  total_marks: Joi.number().required()
});

module.exports = { createQuestionSchema };