const Router = require('koa-router');

module.exports = () => {
  const router = new Router();

  router.get("/healthcheck", (ctx) => {
    ctx.body = "WORKED!";
  });
  return router;
};