import { getRepository, Repository } from 'typeorm';
import { isUuid } from 'uuidv4';
import Member from '../models/Member';
import AppError from '../errors/AppErrors';

interface MemberRequest {
  full_name: string;
  role_id: string;
  id?: string;
}

export default class MemberService {
  private async checkIfExists(
    repository: Repository<Member>,
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

  public async create({ full_name, role_id }: MemberRequest): Promise<Member> {
    const memberRepository = getRepository(Member);
    await this.checkIfExists(
      memberRepository,
      full_name,
      'Member already exists!',
    );

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

    await this.checkIfExists(memberRepository, id, 'id not valid!', false);

    await memberRepository.delete(id);

    return 'Member deleted';
  }

  public async update({
    full_name,
    role_id,
    id,
  }: MemberRequest & { id: string }): Promise<string> {
    const memberRepository = getRepository(Member);

    await this.checkIfExists(memberRepository, id, 'Member don´t exist!');

    await memberRepository.update(id, { full_name, role_id });

    return 'Member Updated';
  }
}
