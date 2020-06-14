import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import userModel from '../users/users.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../users/users.dto';
import LoginDto from './login.dto';
import User from '../users/users.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import Controller from '../interfaces/controller.interface';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialException from '../exceptions/WrongCredentialException';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`,validationMiddleware(CreateUserDto),this.registration);
    this.router.post(`${this.path}/login`,validationMiddleware(LoginDto),this.login);
    this.router.post(`${this.path}/logout`,this.logout);
  }

  private registration = async(request: express.Request, response: express.Response, next:express.NextFunction) => {
    const userData: CreateUserDto = request.body;
    if(
      await this.user.findOne({ email: userData.email })
    ) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      const tokenData = this.createToken(user);
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      response.send(user);
    }
  }

  private login = async(request: express.Request, response: express.Response, next:express.NextFunction) => {
    const loginData:LoginDto = request.body;
    //console.log(loginData);
    const user = await this.user.findOne({email: loginData.email});
    if(user){
      const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);
      if(isPasswordMatching){
        user.password = undefined;
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
      } else {
        next(new WrongCredentialException());
      }
    } else {
      next(new WrongCredentialException());
    }
  }

  private logout = async(request:express.Request,response:express.Response) => {
    const cookie = request.get('Cookie');
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }

  private createCookie(tokenData: TokenData){
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/`;
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, {expiresIn}),
    };
  }
}

export default AuthenticationController;
