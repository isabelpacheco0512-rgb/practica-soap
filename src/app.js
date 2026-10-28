import express from 'express';
import bodyParser from 'body-parser';
import { logger } from './middleware/logger.js';
import { registrarServiciosSoap } from './routes/soap.routes.js';

const app = express();

app.use(logger);
app.use(bodyParser.raw({ type: () => true }));

registrarServiciosSoap(app);

export default app;