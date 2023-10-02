module.exports = ({ mongoose }) => {
  const isMongoAlive = () => mongoose.connection.readyState;
  return {
    isMongoAlive,
  };
};
