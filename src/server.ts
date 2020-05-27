import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import 'express-async-errors';

import routes from './routes';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log('🚀 App launched');
});
