const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .min(8)
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

module.exports = addSchema;
