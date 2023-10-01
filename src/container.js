const { asFunction, createContainer } = require("awilix");
const server = require("./application/server");
const router = require("./application/router");
const logger = require("./infra/logger")

const container = createContainer();

container.register({
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
  });
  
const serverInstance = container.resolve('server');
serverInstance.start();

module.exports = container;