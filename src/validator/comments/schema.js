const Joi = require('joi');

const CommentPayloadSchema = Joi.object({
  text: Joi.string().required(),
  postId: Joi.string().max(21).required(),
});

module.exports = { CommentPayloadSchema };
