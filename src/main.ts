import 'dotenv/config';
import { DBConnection } from './data/config/database.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ZodFilter } from './utils/validation/zod.filter';

async function bootstrap() {
  await DBConnection.initialize();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodFilter());
  await app.listen(3000);
}
bootstrap();
