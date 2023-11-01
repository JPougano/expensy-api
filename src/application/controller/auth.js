const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");

module.exports = ({ userRepository, logger }) => {
  const register = async (ctx, next) => {
    const { username, email, password } = ctx.request.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { _id } = await userRepository.add({
        username,
        email,
        password: hashedPassword,
      });
      ctx.response.status = httpStatus.CREATED;
      ctx.response.body = { message: "Registration successful" };
      logger.info(`User successfully created: user_id ${_id}`);
    } catch (error) {
      next(error);
    }
  };

  const login = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    try {
      const user = await userRepository.getOne(username);
      if (!user) {
        return ctx.throw(httpStatus.NOT_FOUND, {
          message: "User not found",
        });
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        ctx.response.status = httpStatus.UNAUTHORIZED;
        ctx.response.body = {  message: "Incorrect password" };
        logger.warn(`user ${user.id} failed to login. Incorrect passwaord`)
        return
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1 hour",
      });

      ctx.response.status = httpStatus.OK;
      ctx.request.body = { token };
    } catch (error) {
      next(error);
    }
  };
  return { register, login };
};
