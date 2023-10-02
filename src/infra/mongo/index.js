const mongoose = require("mongoose");
const { MONGO_DB_CONNECTION_KEY } = process.env;

module.exports = ({ logger }) => {
  const dbConnection = mongoose.createConnection(MONGO_DB_CONNECTION_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  dbConnection.on("connected", () => {
    logger.info("Successfuly connected to MongoDb.");
  });

  dbConnection.on("error", (err) => {
    logger.error("Error connecting to MongoDb: ", err);
  });

  return {
    connection: dbConnection,
  };
};
