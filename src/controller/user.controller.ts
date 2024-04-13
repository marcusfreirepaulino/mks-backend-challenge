import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  LoginInputModel,
  LoginModel,
  UserInputModel,
} from 'src/model/user.model';
import { CreateUserService } from 'src/service/user/create-user.service';
import { GetUserService } from 'src/service/user/get-user.service';
import { LoginService } from 'src/service/user/login.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly getUserService: GetUserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  getUser(@Req() req: { email: string }) {
    return this.getUserService.exec(req.email);
  }

  @Post()
  create(@Body() input: UserInputModel): Promise<string> {
    return this.createUserService.exec(input);
  }

  @Get('/login')
  login(@Body() input: LoginInputModel): Promise<LoginModel> {
    return this.loginService.exec(input);
  }
}
