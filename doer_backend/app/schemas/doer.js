const Joi = require('@hapi/joi');

const doerCreateSchema = Joi.object().keys({
  name: Joi.string().required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
  services: Joi.string().required(),
  availability: Joi.string().required(),
  rating: Joi.number().required(),
  rate: Joi.number().required(),
});

module.exports = { doerCreateSchema };
