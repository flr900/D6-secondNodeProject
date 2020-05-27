import { Router } from 'express';

const adminsRouter = Router();

adminsRouter.get('/', (req, res) => {
  return res.json({ message: 'Alo admin' });
});

export default adminsRouter;
