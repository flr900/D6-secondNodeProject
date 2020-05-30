import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import Admin from '../models/Admin';
import authConfig from '../config/auth';

interface AuthRequest {
  email: string;
  password: string;
}
interface AuthResponse {
  admin: Admin;
  token: string;
}

export default class AuthService {
  public async execute({
    email,
    password,
  }: AuthRequest): Promise<AuthResponse> {
    const adminsRepository = getRepository(Admin);

    const admin = await adminsRepository.findOne({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new Error('Theese credentials are invalid');
    }

    const matchPassword = await compare(password, admin.password);

    if (!matchPassword) {
      throw new Error('Theese credentials are invalid');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: admin.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      admin,
      token,
    };
  }
}
