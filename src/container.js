const { asFunction, createContainer, asValue } = require("awilix");
const server = require("./application/server");
const router = require("./application/router");
const logger = require("./infra/logger");
const maintenanceController = require("./application/controller/maintenance");
const mongoose = require("./infra/mongo/mongoose");
const mongoHelper = require("./infra/mongo/helpers");
const userSchema = require("./infra/repository/schema/userSchema");
const userRepository = require("./infra/repository/userRepository");
const userBusiness = require("./domain/business/user");
const userController = require("./application/controller/user");
const userValidation = require("./application/validation/userValidation");
const authMiddleware = require("./application/middleware/auth");
const ClientErrors = require("./domain/errors/index");

const container = createContainer();
container.register({
  server: asFunction(server).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),
  mongoose: asFunction(mongoose).singleton(),
  mongoHelper: asFunction(mongoHelper).singleton(),

  //Controllers
  maintenanceController: asFunction(maintenanceController).scoped(),
  userController: asFunction(userController).scoped(),

  // Middlewares
  authMiddleware: asFunction(authMiddleware).singleton(),

  //Schemas
  userSchema: asFunction(userSchema).singleton(),

  //Repositories
  userRepository: asFunction(userRepository).singleton(),

  //Business
  userBusiness: asFunction(userBusiness).singleton(),

  // Models
  userValidation: asFunction(userValidation).singleton(),

  // Client errors
  ClientErrors: asValue(ClientErrors),
});

const serverInstance = container.resolve("server");
serverInstance.start();

module.exports = container;
