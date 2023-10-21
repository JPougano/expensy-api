const Joi = require("joi");

module.exports = () => {
    const createUserModel = {
        username: Joi.string()
          .min(3)
          .max(255)
          .required(),
        email: Joi.string()
          .min(6).max(255)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .max(1024)
          .required().valid(),
      };

      return createUserModel
}
