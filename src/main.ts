import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DBConnection } from './data/config/database.config';

async function bootstrap() {
  await DBConnection.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
