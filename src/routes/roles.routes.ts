import { Router } from 'express';
import { getRepository } from 'typeorm';
import Role from '../models/Role';

const rolesRouter = Router();

rolesRouter.post('/', async (req, res) => {
  const { role_name } = req.body;
  const rolesRepository = getRepository(Role);

  const role = rolesRepository.create({
    role_name,
  });
  console.log(role);

  await rolesRepository.save(role);

  return res.json(role);
});

export default rolesRouter;
