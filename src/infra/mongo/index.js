const mongoose = require("mongoose");
const { MONGO_DB_CONNECTION_KEY } = process.env;

module.exports = () => {
  const mongoDb = mongoose
  mongoDb.connect(MONGO_DB_CONNECTION_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return {
    mongoDb,
  };
};
