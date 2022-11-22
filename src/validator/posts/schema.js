const Joi = require('joi');

const PostPayloadSchema = Joi.object({
  title: Joi.string(),
  status: Joi.string(),
  imageUrl: Joi.string().min(0),
  caption: Joi.string().required(),
});

module.exports = { PostPayloadSchema };
