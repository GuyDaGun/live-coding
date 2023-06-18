import CustomAPIError from './custom-api.js';

class UnAuthenticatedError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnAuthenticatedError
