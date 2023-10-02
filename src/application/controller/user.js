const { CREATED } = require("http-status");

const defaultHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

module.exports = ({ logger, userBusiness }) => {
  const create = async (ctx) => {
    try {
      const user = await userBusiness.createUser(ctx.request.body);
      ctx.response.status = CREATED;
      ctx.response.headers = defaultHeaders;
      ctx.response.body = user;
    } catch (error) {
      if (error.name === "ClientError") {
        ctx.throw(error);
      }
      logger.error("Error creating user", error);
      ctx.throw(new Error("There was an unexpected error creating user"));
    }
  };

  return {
    create,
  };
};
