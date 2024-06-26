import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDbDatasource } from 'src/data/datasource/user.db.datasource';
import { UserInputModel } from 'src/model/user.model';
import {
  generateHashWithSalt,
  generateRandomPassword,
} from 'src/utils/crypto/crypto';

@Injectable()
export class CreateUserService {
  constructor(private readonly datasource: UserDbDatasource) {}

  async exec(input: UserInputModel): Promise<string> {
    const user = await this.datasource.findByEmail(input.email);

    if (user) {
      throw new HttpException(
        'Já existe um usuário com este email.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = generateRandomPassword();
    const hashedPassword = generateHashWithSalt(input.password, salt);

    await this.datasource.insert({
      email: input.email,
      name: input.name,
      password: hashedPassword,
      salt,
    });

    return 'Usuário criado com sucesso.';
  }
}
