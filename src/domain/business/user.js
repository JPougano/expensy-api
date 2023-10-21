const Joi = require("joi");

module.exports = ({ logger, userRepository, userValidation }) => {
  const createUser = async (userData) => {
    try {
      Joi.validate(userData, userValidation.createUserModel);
      const createdUser = await userRepository.add(userData);
      logger.info(`New User Created. id: ${createdUser.id}`);
      return createdUser;
    } catch (error) {
      logger.error(`Error trying to save new user`, {
        error,
      });
      throw error;
    }
  };

  return {
    createUser,
  };
};
