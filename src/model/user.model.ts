import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MinLength } from 'class-validator';

export interface UserModel {
  id: number;
  name: string;
  email: string;
}

export interface AuthModel extends UserModel {
  password: string;
  salt: string;
}

export class UserInputModel {
  @ApiProperty({ example: 'marcus@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345asdxcz',
    description:
      'Uma senha válida tem que ter mais 8 caracteres e pelo menos 1 digito e uma letra',
    minLength: 8,
  })
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).+$/)
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'Marcus Vinicius Freire Paulino',
    minLength: 1,
    maxLength: 100,
  })
  name: string;
}

export class LoginInputModel {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export interface LoginModel {
  token: string;
}
