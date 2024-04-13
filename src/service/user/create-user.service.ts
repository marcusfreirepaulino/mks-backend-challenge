import { Injectable } from '@nestjs/common';
import { UserDbDatasource } from 'src/data/datasource/user.db.datasource';
import { UserInputModel } from 'src/model/user.model';

@Injectable()
export class CreateUserService {
  constructor(private readonly datasource: UserDbDatasource) {}

  async exec(input: UserInputModel): Promise<string> {
    const user = await this.datasource.findByEmail(input.email);

    if (user) {
      throw new Error('Já existe um usuário com este email.');
    }

    return 'Usuário criado com sucesso.';
  }
}
