const { asFunction, createContainer } = require("awilix");
const server = require("./application/server");
const router = require("./application/router");
const logger = require("./infra/logger")
const maintenanceController = require("./application/controller/maintenance");
const mongoose = require("./infra/mongo/mongoose");
const mongoHelper = require("./infra/mongo/helpers");
const userSchema = require("./infra/repository/schema/userSchema");
const userRepository = require("./infra/repository/userRepository")
const userBusiness = require('./domain/business/user');
const userController = require("./application/controller/user");

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

  //Schemas
  userSchema: asFunction(userSchema).singleton(),

  //Repositories
  userRepository: asFunction(userRepository).singleton(),

  //Business
  userBusiness: asFunction(userBusiness).singleton(),
});
  
const serverInstance = container.resolve('server');
serverInstance.start();

module.exports = container;
