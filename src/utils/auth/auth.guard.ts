import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyJwt } from 'src/utils/jwt';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Permissão negada. Faça o login.');
    }

    try {
      const payload = verifyJwt(token);

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Permissão negada. Faça o login.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers['authorization'];
  }
}
