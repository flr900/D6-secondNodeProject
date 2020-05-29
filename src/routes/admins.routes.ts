import { Router } from 'express';
import AdminService from '../services/AdminService';

const adminsRouter = Router();

adminsRouter.get('/', (req, res) => {
  return res.json({ message: 'Alo admin' });
});

adminsRouter.post('/', async (req, res) => {
  try {
    const { email, password, full_name, role_id } = req.body;

    const createAdmin = new AdminService();

    const user = await createAdmin.create({
      email,
      password,
      full_name,
      role_id,
    });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default adminsRouter;
