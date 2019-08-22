import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import cors from 'koa2-cors';
import routing from './routes';
import { port, connexionString } from './config';

// db settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(connexionString, {dbName: 'kjfwd'});
mongoose.connection.on('error', console.error);

const corsConfig = {
  origin: '*'
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // credentials: true,
  // allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}

// Create Koa Application
const app = new Koa();

app
  .use(cors(corsConfig))
  .use(logger())
  .use(bodyParser())
  .use(helmet());

routing(app);

// Start the application
app.listen(port, '0.0.0.0', () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);
export default app;
