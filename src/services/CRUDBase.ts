/*
import { getRepository, Repository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppErrors';

interface xxx {}
export default class xxxService {
  private async checkIfExists(
    repository: Repository<xxxxxx>,
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
}
*/
