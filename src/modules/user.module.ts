import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user.controller';
import { CreateUserService } from 'src/service/user/create-user.service';
import { LoginService } from 'src/service/user/login.service';
import { UserDbDatasource } from 'src/data/datasource/user.db.datasource';
import { GetUserService } from 'src/service/user/get-user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserService,
    LoginService,
    GetUserService,
    UserDbDatasource,
  ],
})
export class UserModule {}
