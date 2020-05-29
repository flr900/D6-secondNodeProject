import { getRepository } from 'typeorm';
import Role from '../models/Role';

interface RoleRequest {
  role_name: string;
}

export default class RoleService {
  public async create({ role_name }: RoleRequest): Promise<Role> {
    const rolesRepository = getRepository(Role);
    const checkIfRoleExists = await rolesRepository.findOne({
      where: { role_name },
    });

    if (checkIfRoleExists) {
      throw new Error('This role already exists');
    }
    const role = rolesRepository.create({ role_name });
    await rolesRepository.save(role);

    return role;
  }

  public async list(): Promise<Role[]> {
    const rolesRepository = getRepository(Role);
    const roles = await rolesRepository.find();
    return roles;
  }

  public async remove(id: string): Promise<void> {
    const rolesRepository = getRepository(Role);

    const checkIfRoleExists = await rolesRepository.findOne({
      where: { id },
    });

    if (!checkIfRoleExists) {
      throw new Error('This role doesn´t exists');
    }

    await rolesRepository.delete(id);
  }
}
