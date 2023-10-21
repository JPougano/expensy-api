const Router = require('koa-router');

module.exports = ({ maintenanceController, userController }) => {
  const router = new Router();

  router.get("/api/healthcheck", maintenanceController.healthCheck);
  router.get("/api/readiness", maintenanceController.readiness);
  router.post("/api/user/register", userController.create);

  return router;
};