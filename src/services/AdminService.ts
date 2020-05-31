import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isUuid } from 'uuidv4';
import Admin from '../models/Admin';
import AppError from '../errors/AppErrors';

interface AdminRequest {
  email: string;
  password: string;
  full_name: string;
  role_id: string;
}

export default class AdminService {
  private async checkIfExists(
    repository: Repository<Admin>,
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
          where: { full_name: uniqueKey },
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

  public async create({
    email,
    password,
    full_name,
    role_id,
  }: AdminRequest): Promise<Admin> {
    const adminsRepository = getRepository(Admin);
    await this.checkIfExists(
      adminsRepository,
      email,
      'This email is already used',
    );

    const passwordHash = await hash(password, 8);

    const admin = adminsRepository.create({
      email,
      full_name,
      password: passwordHash,
      role_id,
    });

    await adminsRepository.save(admin);

    return admin;
  }

  public async remove(id: string): Promise<string> {
    const adminsRepository = getRepository(Admin);

    await this.checkIfExists(adminsRepository, id, 'Invalid ID', false);

    await adminsRepository.delete(id);

    return 'user deleted';
  }
}
