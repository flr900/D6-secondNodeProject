import { Router } from 'express';
import { getRepository } from 'typeorm';
import AdminService from '../services/AdminService';
import Admin from '../models/Admin';

const adminsRouter = Router();

adminsRouter.get('/', async (req, res) => {
  const adminsRepository = getRepository(Admin);

  const admins = await adminsRepository.find();

  const adminsParsed = admins.map(admin => {
    delete admin.password;
    return admin;
  });
  return res.json(adminsParsed);
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

adminsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteAdmin = new AdminService();

    const response = await deleteAdmin.remove(id);

    return res.json({ message: response });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default adminsRouter;
