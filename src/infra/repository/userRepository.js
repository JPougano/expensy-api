const MongoRepository = require('./abstractMongoRepository');

module.exports = ({ userSchema }) => new MongoRepository(userSchema);