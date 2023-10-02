const Router = require('koa-router');

module.exports = ({ maintenanceController }) => {
  const router = new Router();

  router.get("/healthcheck", maintenanceController.healthCheck);
  router.get("/readiness", maintenanceController.readiness);
  return router;
};