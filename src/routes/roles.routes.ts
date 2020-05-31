import { Router } from 'express';

import RoleService from '../services/RoleService';

const rolesRouter = Router();

rolesRouter.post('/', async (req, res) => {
  const { role_name } = req.body;
  const roleService = new RoleService();

  const role = await roleService.create({
    role_name,
  });
  return res.json(role);
});

rolesRouter.get('/', async (req, res) => {
  const roleService = new RoleService();
  const roles = await roleService.list();
  return res.json(roles);
});

rolesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const roleService = new RoleService();

  const roleDeleted = await roleService.remove(id);

  return res.status(204).json({ message: roleDeleted });
});

export default rolesRouter;
