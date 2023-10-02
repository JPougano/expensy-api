const Koa = require("koa");
const util = require('util');
const { PORT } = process.env;

module.exports = ({ router, logger }) => {
  const app = new Koa();

  app.use(router.routes());

  return {
    app,
    start: async () => {
      try {
        app.listen(PORT, () => {
          logger.error(`Server listening on ${PORT}`);
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
