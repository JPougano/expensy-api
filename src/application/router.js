const Router = require('koa-router');

module.exports = ({ maintenanceController, userController }) => {
  const router = new Router();

  router.get("/healthcheck", maintenanceController.healthCheck);
  router.get("/readiness", maintenanceController.readiness);
  router.post("/user", userController.create);
  return router;
};