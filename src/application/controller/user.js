const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");

module.exports = ({ userBusiness, ClientErrors, logger }) => {
  const create = async (ctx) => {
    const { username, email, password } = ctx.request.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userBusiness.createUser({
        username,
        email,
        password: hashedPassword,
      });

      ctx.response.status = httpStatus.CREATED;
      ctx.response.body = { message: "User successfully ", user };
    } catch (error) {
      if (error.code) {
        logger.error("Error creating user", error);
        ctx.throw(ClientErrors.AlreadyExistsError);
      }

      logger.error("Error creating user", error);
      ctx.throw(httpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  const login = async (ctx) => {
    const { email, password } = ctx.request.body;

    try {
      const user = await userBusiness.getUser(email);

      if (!user) {
        throw ClientErrors.NotFound;
      }
      const passwordMatch = await user.comparePassword(password);

      if (!passwordMatch) {
        throw ClientErrors.InvalidCredentials;
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1 hour",
      });

      ctx.response.status = httpStatus.OK;
      ctx.response.body = { token };
    } catch (error) {
      logger.error("Failed to login:", error);

      if (error.status === httpStatus.UNAUTHORIZED) {
        ctx.throw(ClientErrors.InvalidCredentials);
      }

      if (error.status === httpStatus.NOT_FOUND) {
        ctx.throw(ClientErrors.NotFound);
      }

      ctx.throw(httpStatus.INTERNAL_SERVER_ERROR);
    }
  };
  return { create, login };
};
