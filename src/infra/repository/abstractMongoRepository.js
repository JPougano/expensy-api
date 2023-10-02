const lodash = require('lodash');

class MongoRepository {
  constructor(model) {
    this.model = model;
  }

  async add(payload) {
    const model = this.model(payload);
    const savedInstance = await model.save();
    return savedInstance;
  }

  async getOne({ query, field = '_id' }) {
    return lodash.head(await this.model.find(query).sort(field).limit(1));
  }

  async get(query, limit = 100) {
    return this.model.paginate(query).limit(limit);
  }
}

module.exports = MongoRepository;