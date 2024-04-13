import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth/auth.guard';
import {
  LoginInputModel,
  LoginModel,
  UserInputModel,
} from 'src/model/user.model';
import { CreateUserService } from 'src/service/user/create-user.service';
import { GetUserService } from 'src/service/user/get-user.service';
import { LoginService } from 'src/service/user/login.service';
import { ZodPipe } from 'src/utils/validation/zod.pipe';
import { userSchema } from 'src/service/validators/user.validators';

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
  create(
    @Body(new ZodPipe(userSchema)) input: UserInputModel,
  ): Promise<string> {
    return this.createUserService.exec(input);
  }

  @Get('/login')
  login(@Body() input: LoginInputModel): Promise<LoginModel> {
    return this.loginService.exec(input);
  }
}
