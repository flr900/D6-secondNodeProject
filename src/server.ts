import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Alo mundo' });
});
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log('🚀 App launched');
});
