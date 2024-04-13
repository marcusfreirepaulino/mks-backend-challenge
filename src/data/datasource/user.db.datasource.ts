import { Injectable } from '@nestjs/common';
import { DBConnection } from 'src/data/config/database.config';
import { UserEntity } from 'src/data/entity/user.entity';
import { AuthModel, UserInputModel, UserModel } from 'src/model/user.model';

interface InsertParams extends UserInputModel {
  salt: string;
}

@Injectable()
export class UserDbDatasource {
  private readonly repository = DBConnection.getRepository(UserEntity);

  insert(input: InsertParams): Promise<UserModel> {
    return this.repository.save(input);
  }

  findByEmail(email: string): Promise<AuthModel | null> {
    return this.repository.findOneBy({ email });
  }
}
