import { Router } from 'express';

import RoleService from '../services/RoleService';

const rolesRouter = Router();

rolesRouter.post('/', async (req, res) => {
  const { role_name } = req.body;
  const roleService = new RoleService();

  const role = roleService.createRole({
    role_name,
  });
  return res.json(role);
});

rolesRouter.get('/', async (req, res) => {
  const roleService = new RoleService();
  const roles = await roleService.listRoles();
  return res.json(roles);
});

rolesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const roleService = new RoleService();

  await roleService.deleteRole(id);

  return res.status(204);
});

export default rolesRouter;
