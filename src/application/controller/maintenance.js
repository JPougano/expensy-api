const { OK, INTERNAL_SERVER_ERROR } = require("http-status");

module.exports = ({ mongoHelper }) => {
  const healthCheck = async (ctx) => {
    ctx.status = OK;
    ctx.body = "OK";
  };

  const readiness = async (ctx) => {
    const applicationIsReady = mongoHelper.isMongoAlive() === 1;
    ctx.status = applicationIsReady ? OK : INTERNAL_SERVER_ERROR;
    ctx.body = applicationIsReady ? "OK" : "NOT-OK";
  };

  return { healthCheck, readiness };
};
