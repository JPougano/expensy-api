const { asFunction, createContainer } = require("awilix");
const server = require("./application/server");
const router = require("./application/router");
const logger = require("./infra/logger")
const maintenanceController = require("./application/controller/maintenance");
const mongoose = require("./infra/mongo/mongoose");
const mongoHelper = require("./infra/mongo/helpers");

const container = createContainer();

container.register({
  server: asFunction(server).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),
  mongoose: asFunction(mongoose).singleton(),
  mongoHelper: asFunction(mongoHelper).singleton(),

  //Controllers
  maintenanceController: asFunction(maintenanceController).scoped(),
});
  
const serverInstance = container.resolve('server');
serverInstance.start();

module.exports = container;
