import { getRepository } from 'typeorm';
import Role from '../models/Role';

interface RoleRequest {
  role_name: string;
}

export default class RoleService {
  public async createRole({ role_name }: RoleRequest): Promise<Role> {
    const rolesRepository = getRepository(Role);
    const checkIfRoleExists = await rolesRepository.findOne({
      where: { role_name },
    });

    if (checkIfRoleExists) {
      throw new Error('This email is already used');
    }
    const role = rolesRepository.create({ role_name });

    await rolesRepository.save(role);

    return role;
  }

  public async listRoles(): Promise<Role[]> {
    const rolesRepository = getRepository(Role);
    const roles = await rolesRepository.find();
    return roles;
  }

  public async deleteRole(role_id: string): Promise<void> {
    const rolesRepository = getRepository(Role);
    const roleDeleted = rolesRepository.delete(role_id);
    if (!roleDeleted) {
      throw new Error('Could not Delete Role!');
    }
  }
}
