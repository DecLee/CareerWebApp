import HttpException from './HttpException';

class CareerNotFoundException extends HttpException {
  constructor(id:string){
    super(400,`Career with id:${id} not found`);
  }
}

export default CareerNotFoundException;
