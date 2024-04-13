import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth/auth.guard';
import {
  LoginInputModel,
  LoginModel,
  UserInputModel,
} from 'src/model/user.model';
import { CreateUserService } from 'src/service/user/create-user.service';
import { GetUserService } from 'src/service/user/get-user.service';
import { LoginService } from 'src/service/user/login.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly getUserService: GetUserService,
  ) {}

  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiTags('User')
  @Post()
  create(@Query() input: UserInputModel): Promise<string> {
    return this.createUserService.exec(input);
  }

  @ApiOperation({ summary: 'Loga em um usuário existente' })
  @ApiTags('User')
  @Get('/login')
  login(@Query() input: LoginInputModel): Promise<LoginModel> {
    return this.loginService.exec(input);
  }

  @ApiOperation({ summary: 'Recebe os dados do usuário atual' })
  @ApiTags('User')
  @UseInterceptors(CacheInterceptor)
  @Get()
  @UseGuards(AuthGuard)
  getUser(@Req() req: { email: string }) {
    return this.getUserService.exec(req.email);
  }
}
