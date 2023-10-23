const Joi = require("@hapi/joi");

const createUserModel = () =>
  Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required().valid(),
  });

module.exports = createUserModel;
