import HttpException from './HttpException';

class WrongCredentialException extends HttpException {
  constructor() {
    super(400, 'Wrong username or password');
  }
}

export default WrongCredentialException;
