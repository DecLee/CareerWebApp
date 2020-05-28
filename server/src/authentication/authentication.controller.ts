import * as express from 'express';
import userModel from '../users/users.model';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`,)
  }
}
