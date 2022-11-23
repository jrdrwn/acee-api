const Joi = require('joi');

const PostPayloadSchema = Joi.object({
  title: Joi.string().min(0),
  status: Joi.string().min(0),
  imageUrl: Joi.string().min(0),
  caption: Joi.string().required(),
});

module.exports = { PostPayloadSchema };
