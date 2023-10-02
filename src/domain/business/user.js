module.exports =({logger, userRepository}) => {
    const createUser = async (userData) => {
        try {
          const createdUser = await userRepository.add(userData);
          logger.info(`New User Created. id: ${createdUser.id}`);
          return createdUser;
        } catch (error) {
          logger.error(`Error trying to save new user`, {
            error
          });
          throw error;
        }
      };
    
      return {
        createUser,
      };
}