const Router = require("koa-router");

module.exports = ({ maintenanceController, userController, authController, authMiddleware }) => {
  const router = new Router();

  router.get("/api/healthcheck", maintenanceController.healthCheck);
  router.get("/api/readiness", maintenanceController.readiness);
  router.post("/api/user/register", userController.create);
  router.post("/api/auth/register", authController.register);
  router.post("/api/user/login", authController.login);
  router.get("/profile", authMiddleware.authenticate, (ctx) => {
    ctx.body({ message: `Welcome ${req.user.username}` });
  });

  return router;
};
