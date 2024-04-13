import { Injectable } from '@nestjs/common';
import { UserDbDatasource } from 'src/data/datasource/user.db.datasource';
import { LoginInputModel, LoginModel } from 'src/model/user.model';
import { generateHashWithSalt } from 'src/utils/crypto';
import { signJwt } from 'src/utils/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly datasource: UserDbDatasource) {}

  async exec(input: LoginInputModel): Promise<LoginModel> {
    const user = await this.datasource.findByEmail(input.email);

    if (!user) {
      throw new Error('Credenciais não válidas.');
    }

    const hashedPassword = generateHashWithSalt(input.password, user.salt);

    if (hashedPassword !== user.password) {
      throw new Error('Credenciais não válidas');
    }

    const token = signJwt<{ email: string }>({ email: user.email });

    return { token };
  }
}
