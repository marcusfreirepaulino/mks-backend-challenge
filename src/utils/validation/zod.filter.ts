import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.BAD_REQUEST;
    response.status(status).json({
      message: exception.errors[0].message,
      statusCode: status,
    });
  }
}
