const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  doer_id: Joi.number().required(),
  full_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  address: Joi.string().required(),
  services: Joi.string().required(),
  testiong1233: Joi.string().required()
});

module.exports = { schema };
