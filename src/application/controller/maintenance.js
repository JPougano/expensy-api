const { OK } = require("http-status");

module.exports = () => {
  const healthCheck = async (ctx) => {
    ctx.status = OK;
    ctx.body = "OK";
  };

  return { healthCheck };
};
