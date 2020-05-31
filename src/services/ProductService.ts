import { getRepository, Repository } from 'typeorm';
import { isUuid } from 'uuidv4';
import fs from 'fs';
import Product from '../models/Product';
import uploadConfig from '../config/Upload';
import AppError from '../errors/AppErrors';

interface ProductRequest {
  name: string;
  alias: string;
  host: 'Gnews' | 'E.G' | 'Rede' | 'Íon' | 'Local' | 'Esporte' | 'Evento';
  initial_time: Date;
  end_time: Date;
  studio: string;
  avatarFileName?: string;
}

interface ProductIdRequest extends ProductRequest {
  id: string;
}

export default class ProductService {
  private async checkIfExists(
    repository: Repository<Product>,
    uniqueKey: string,
    message: string,
    type = true,
    deleteFile?: string,
  ): Promise<Product> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let checkIfExists: any;

      if (isUuid(uniqueKey)) {
        checkIfExists = await repository.findOne({
          where: { id: uniqueKey },
        });
      } else {
        checkIfExists = await repository.findOne({
          where: [{ name: uniqueKey }, { alias: uniqueKey }],
        });
      }

      if (Boolean(checkIfExists) === type) {
        if (deleteFile) {
          fs.promises.unlink(deleteFile);
        } else {
          fs.promises.unlink(checkIfExists?.avatar_link);
        }
        throw new Error(message);
      }
      return checkIfExists;
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  public async create({
    name,
    alias,
    host,
    studio,
    initial_time,
    end_time,
    avatarFileName,
  }: ProductRequest): Promise<Product> {
    const productRepository = getRepository(Product);
    const avatar_link = `${uploadConfig.directory}/${avatarFileName}`;
    await this.checkIfExists(
      productRepository,
      name,
      'Product already exists!',
    );
    const product = productRepository.create({
      name,
      alias,
      host,
      studio,
      initial_time,
      end_time,
      avatar_link,
    });

    const validHosts = [
      'Gnews',
      'E.G',
      'Rede',
      'Íon',
      'Local',
      'Esporte',
      'Evento',
    ];

    const checkHost = validHosts.find(validHostItem => validHostItem === host);

    if (!checkHost) {
      fs.promises.unlink(avatar_link);
      throw new AppError('Host not valid!');
    }

    await productRepository.save(product);

    return product;
  }

  public async list(): Promise<Product[]> {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  }

  public async delete(id: string): Promise<string> {
    const productRepository = getRepository(Product);
    const product = await this.checkIfExists(
      productRepository,
      id,
      'Id not valid!',
      false,
    );
    fs.promises.unlink(product.avatar_link);
    await productRepository.delete(id);
    return 'Product deleted!';
  }

  public async update({
    id,
    name,
    host,
    alias,
    initial_time,
    end_time,
    studio,
  }: ProductIdRequest): Promise<string> {
    const productRepository = getRepository(Product);
    await this.checkIfExists(productRepository, id, 'Id not valid!', false);
    const checkIfNameExists = await productRepository.findOne({
      where: { name },
    });

    if (checkIfNameExists) {
      throw new AppError('Name already exists');
    }
    await productRepository.update(id, {
      name,
      host,
      alias,
      initial_time,
      end_time,
      studio,
    });
    return 'Product updated!';
  }

  public async updateAvatar({
    id,
    avatarFileName,
  }: {
    id: string;
    avatarFileName: string;
  }): Promise<string> {
    const productRepository = getRepository(Product);
    const avatar_link = `${uploadConfig.directory}/${avatarFileName}`;

    const product = await this.checkIfExists(
      productRepository,
      id,
      'Id not valid',
      false,
      avatar_link,
    );

    fs.promises.unlink(product.avatar_link);

    await productRepository.update(id, {
      avatar_link,
    });

    return 'Avatar updated!';
  }
}
