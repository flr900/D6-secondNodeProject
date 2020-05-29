import { Router } from 'express';
import AuthService from '../services/AuthService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const auth = new AuthService();

  const { admin, token } = await auth.execute({ email, password });

  delete admin.password;

  return res.json({ admin, token });
});

export default sessionsRouter;
