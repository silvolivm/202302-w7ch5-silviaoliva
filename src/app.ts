import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { usersRouter } from './routers/users.router.js';
import createDebug from 'debug';
import { CustomError } from './interfaces/errors.js';
import { __dirname } from './config.js';
const debug = createDebug('W6:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use((_req, _resp, next) => {
  debug('Soy un middleware');
  next();
});

debug({ __dirname });
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/users', usersRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: '202301-w07ch5-silviaoliva',
    endpoints: {
      users: '/users',
    },
  });
});
app.get('/:id', (req, resp) => {
  resp.send('Bienvenidos ' + req.params.id);
});
app.post('/', (req, resp) => {
  req.body.id = 12;
  resp.send(req.body);
});
app.patch('/:id');
app.delete('/:id');

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Soy el middleware de errores');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
    debug(status, statusMessage, error.message);
  }
);
