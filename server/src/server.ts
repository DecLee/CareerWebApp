import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import CareerController from './careers/career.controller';

const app = new App(
  [
    new AuthenticationController(),
    new CareerController(),
  ],
);

app.listen();
