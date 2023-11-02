const Joi = require("@hapi/joi");

module.exports = ({ logger, userRepository, userValidation }) => {
  const createUser = async (userData) => {
    try {
      // const { error } = userValidation.validate(userData);
      // if (error) {
      //   throw error
      // }

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

  const getUser = async (requestQuery) => {
    const user = await userRepository.getOne(requestQuery);
    return user;
  };

  return {
    createUser,
    getUser,
  };
};
