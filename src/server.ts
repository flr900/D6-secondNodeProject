/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import 'express-async-errors';
import AppError from './errors/AppErrors';

import './database';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log('🚀 App launched');
});
