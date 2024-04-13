import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  LoginInputModel,
  LoginModel,
  UserInputModel,
} from 'src/model/user.model';
import { CreateUserService } from 'src/service/user/create-user.service';
import { LoginService } from 'src/service/user/login.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
  ) {}

  @Post()
  create(@Body() input: UserInputModel): Promise<string> {
    return this.createUserService.exec(input);
  }

  @Get('/login')
  login(@Body() input: LoginInputModel): Promise<LoginModel> {
    return this.loginService.exec(input);
  }
}
