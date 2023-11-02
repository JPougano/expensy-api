const { BAD_REQUEST, CONFLICT, UNAUTHORIZED, NOT_FOUND } = require('http-status');

class ClientError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ClientError';
    this.status = status;
  }
}

const MissingProperty = new ClientError(BAD_REQUEST, 'Every property mus be provided');
const InvalidCredentials = new ClientError(UNAUTHORIZED, 'Invalid user credentials');
const NotFound = new ClientError(NOT_FOUND, 'User not found');
const AlreadyExistsError = new ClientError(CONFLICT, 'User already exists');

module.exports = {
  ClientError,
  MissingProperty,
  InvalidCredentials,
  NotFound,
  AlreadyExistsError

};