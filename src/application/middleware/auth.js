const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

module.exports = ({ userRepository }) => {
  const authenticate = async (ctx, next) => {
    const token = ctx.request.headers.authorization?.split(" ")[1];

    if (!token) {
      return ctx.throw(httpStatus.UNAUTHORIZED, {
        message: "Authentication required",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const user = await userRepository.getOne(decodedToken.userId);
      if (!user) {
        return ctx.throw(httpStatus.NOT_FOUND, {
          message: "User not found",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  return { authenticate };
};
