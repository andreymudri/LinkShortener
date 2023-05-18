const Joi = require('joi');

export const shortenUrlSchema = Joi.object({
  url: Joi.string().uri().required(),
});
