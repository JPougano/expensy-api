const Router = require("koa-router");

module.exports = ({ maintenanceController, userController, authMiddleware }) => {
  const router = new Router();

  router.get("/api/healthcheck", maintenanceController.healthCheck);
  router.get("/api/readiness", maintenanceController.readiness);
  router.post("/api/user/register", userController.create);
  router.post("/api/user/login", userController.login);
  router.get("/api/user/profile", authMiddleware.authenticate, (ctx) => {
    ctx.body({ message: `Welcome ${ctx.request.body.user.username}` });
  });

  return router;
};
