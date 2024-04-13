import { Injectable } from '@nestjs/common';
import { UserDbDatasource } from 'src/data/datasource/user.db.datasource';
import { UserModel } from 'src/model/user.model';

@Injectable()
export class GetUserService {
  constructor(private readonly datasource: UserDbDatasource) {}

  async exec(email: string): Promise<UserModel> {
    const user = await this.datasource.findByEmail(email);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
