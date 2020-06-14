//imports
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import loggerMiddleware from './middleware/logger.middleware';

class App {
    public app: express.Application;

    constructor(controllers:Controller[]){
        //initializers
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();

        this.initializeLogger();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();


    }

    public listen() {
      this.app.listen(process.env.PORT, () => {
        console.log(`App listening on the port ${process.env.PORT}`);
      });
    }

    public getServer() {
      return this.app;
    }

    private initializeMiddlewares() {
      this.app.use(bodyParser.json());
      this.app.use(cookieParser());
      this.app.use(cors());
    }

    private initializeErrorHandling() {
      this.app.use(errorMiddleware);
    }

    private initializeLogger(){
      this.app.use(loggerMiddleware);
    }
    private initializeControllers(controllers:Controller[]){
      controllers.forEach((controllers) => {
        this.app.use('/',controllers.router);
      });
    }

    private connectToTheDatabase() {
      const {
        MONGO_PATH,
      } = process.env;
      mongoose.connect(`mongodb://${MONGO_PATH}`, {useNewUrlParser: true});
    }
}

export default App;
