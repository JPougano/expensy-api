const Koa = require("koa");
const util = require('util');
const bodyParser = require("koa-bodyparser");
const { PORT } = process.env;

module.exports = ({ router, logger }) => {
  const app = new Koa();

  app
  .use(bodyParser({ enableTypes: ['json'] }))
  .use(router.routes());

  return {
    app,
    start: async () => {
      try {
        app.listen(PORT, () => {
          logger.info(`Server listening on ${PORT}`);
        });
      } catch (err) {
        logger.error("Problem initializing server", {
          error: util.inspect(err),
        });
        process.exit(1);
      }
    },
  };
};
