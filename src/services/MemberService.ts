import { getRepository } from 'typeorm';
import Member from '../models/Member';

interface MemberRequest {
  full_name: string;
  role_id: string;
  id?: string;
}

export default class MemberService {
  public async create({ full_name, role_id }: MemberRequest): Promise<Member> {
    const memberRepository = getRepository(Member);
    const checkIfMemberExists = await memberRepository.findOne({
      where: { full_name },
    });

    if (checkIfMemberExists) {
      throw new Error('This member already exists');
    }
    const member = memberRepository.create({ full_name, role_id });
    await memberRepository.save(member);

    return member;
  }

  public async list(): Promise<Member[]> {
    const memberRepository = getRepository(Member);
    const members = await memberRepository.find();
    return members;
  }

  public async remove(id: string): Promise<string> {
    const memberRepository = getRepository(Member);

    const checkIfMemberExists = await memberRepository.findOne({
      where: { id },
    });
    if (!checkIfMemberExists) {
      throw new Error('This member doesn´t exists');
    }

    await memberRepository.delete(id);

    return 'Member deleted';
  }

  public async update({
    full_name,
    role_id,
    id,
  }: MemberRequest & { id: string }): Promise<string> {
    const memberRepository = getRepository(Member);
    const checkIfMemberExists = await memberRepository.findOne({
      where: { full_name },
    });

    if (checkIfMemberExists) {
      throw new Error('This member already exists');
    }
    await memberRepository.update(id, { full_name, role_id });

    return 'Member Updated';
  }
}
