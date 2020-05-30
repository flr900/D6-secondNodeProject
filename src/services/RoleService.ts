import { getRepository, Repository } from 'typeorm';
import { isUuid } from 'uuidv4';
import Role from '../models/Role';
import AppError from '../errors/AppErrors';

interface RoleRequest {
  role_name: string;
}

export default class RoleService {
  private async checkIfExists(
    repository: Repository<Role>,
    uniqueKey: string,
    message: string,
    type = true,
  ): Promise<void> {
    try {
      let checkIfExists;

      if (isUuid(uniqueKey)) {
        checkIfExists = await repository.findOne({
          where: { id: uniqueKey },
        });
      } else {
        checkIfExists = await repository.findOne({
          where: { role_name: uniqueKey },
        });
      }

      if (Boolean(checkIfExists) === type) {
        throw new Error(message);
      }
      return;
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  public async create({ role_name }: RoleRequest): Promise<Role> {
    const rolesRepository = getRepository(Role);

    await this.checkIfExists(
      rolesRepository,
      role_name,
      'This role already exists',
    );

    const role = rolesRepository.create({ role_name });
    await rolesRepository.save(role);

    return role;
  }

  public async list(): Promise<Role[]> {
    const rolesRepository = getRepository(Role);
    const roles = await rolesRepository.find();
    return roles;
  }

  public async remove(id: string): Promise<string> {
    const rolesRepository = getRepository(Role);

    await this.checkIfExists(rolesRepository, id, 'id not valid!', false);

    await rolesRepository.delete(id);

    return 'Role deleted';
  }
}
