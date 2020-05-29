import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Admin from '../models/Admin';

interface AdminRequest {
  email: string;
  password: string;
  full_name: string;
  role_id: string;
}

export default class AdminService {
  public async create({
    email,
    password,
    full_name,
    role_id,
  }: AdminRequest): Promise<Admin> {
    const adminsRepository = getRepository(Admin);
    const checkIfAdminExists = await adminsRepository.findOne({
      where: { email },
    });

    if (checkIfAdminExists) {
      throw new Error('This email is already used');
    }

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

    const checkIfAdminExists = await adminsRepository.findOne(id);

    if (!checkIfAdminExists) {
      throw new Error('Invalid ID');
    }

    await adminsRepository.delete(id);

    return 'user deleted';
  }
}
