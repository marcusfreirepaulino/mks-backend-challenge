import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDbDatasource } from 'src/data/datasource/user.db.datasource';
import { LoginInputModel, LoginModel } from 'src/model/user.model';
import { generateHashWithSalt } from 'src/utils/crypto/crypto';
import { signJwt } from 'src/utils/auth/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly datasource: UserDbDatasource) {}

  async exec(input: LoginInputModel): Promise<LoginModel> {
    const user = await this.datasource.findByEmail(input.email);
    const hashedPassword = generateHashWithSalt(input.password, user.salt);

    if (!user) {
      throw new HttpException(
        'Credenciais não válidas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (hashedPassword !== user.password) {
      throw new HttpException(
        'Credenciais não válidas',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = signJwt<{ email: string }>({ email: user.email });

    return { token };
  }
}
