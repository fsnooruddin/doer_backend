const Joi = require('@hapi/joi');

const doerCreateSchema = Joi.object().keys({
  full_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
  services: Joi.string().required(),
});

const doerGetSchema = Joi.object().keys({
  doer_id: Joi.number().required(),
  full_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
  services: Joi.string().required(),
});

module.exports = { doerCreateSchema, doerGetSchema };
