import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/', (req, res) => {
  // const { email, password } = req.body;

  // const auth = new AuthService();

  // const { user, token } = auth.execute({ email, password });

  // delete user.password;

  return res.json({ hello: 'World' });
});

export default sessionsRouter;
