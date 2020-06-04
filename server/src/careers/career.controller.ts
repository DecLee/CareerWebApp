// create post // edit post // delete post //
import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Career from './career.interface';
import careerModel from './career.model';
import CareerNotFoundException from '../exceptions/CareerNotFoundException';
import CreateCareerDto from './career.dto';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';


class CareerController implements Controller {
  public path = '/career';
  public router = express.Router();
  public career = careerModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllCareer);
    this.router.get(`${this.path}/id`, this.getCareerById);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(`${this.path}/:id`,validationMiddleware(CreateCareerDto, true), this.modifyCareer)
      .delete(`${this.path}/:id`, this.deleteCareer)
      .post(this.path, authMiddleware, validationMiddleware(CreateCareerDto), this.createCareer);
  }

  private getAllCareer = async(req:express.Request, res: express.Response, next: express.NextFunction) => {
      const careers = await this.career.find()
        .populate('author', '-password');
      res.send(careers);
  }

  private getCareerById = async(req: express.Request, res: express.Response, next:express.NextFunction) => {
    const id = req.params.id;
    this.career.findById(id)
      .then((career) => {
        if(career){
          res.send(career);
        } else {
          next(new CareerNotFoundException(id));
        }
      });
  }

  private modifyCareer = async(req:express.Request, res:express.Response, next:express.NextFunction) => {
    const id = req.params.id;
    const careerData: Career = req.body;
    this.career.findByIdAndUpdate(id, careerData, {new:true})
      .then((career) => {
        if(career){
          res.send(career)
        } else{
          next(new CareerNotFoundException(id));
        }
      });
  }

  private deleteCareer = async(req:express.Request, res:express.Response, next:express.NextFunction) => {
    const id = req.params.id;
    this.career.findByIdAndDelete(id)
      .then((successResponse) => {
        if(successResponse){
          res.send(200);
        } else {
        next(new CareerNotFoundException(id));
      }
    });
  }

  private createCareer = async(req:RequestWithUser, res:express.Response) => {
    const careerData:CreateCareerDto = req.body;
    const createdCareer = new this.career({
      ...careerData,
      author: req.user._id,
    });
    const savedCareer = await createdCareer.save();
    await savedCareer.populate('author','-password').execPopulate();
    res.send(savedCareer);
  }
}

export default CareerController;
