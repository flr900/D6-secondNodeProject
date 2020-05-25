import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Alo mundo' });
});

app.listen(3333, () => {
  console.log('🚀 App launched');
});
