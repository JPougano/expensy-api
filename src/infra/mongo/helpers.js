module.exports = ({ mongoInfra }) => {
  const isMongoAlive = () => mongoInfra.connection.readyState;
  return {
    isMongoAlive,
  };
};
