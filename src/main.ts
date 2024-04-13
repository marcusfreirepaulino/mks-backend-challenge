import 'dotenv/config';
import { DBConnection } from './data/config/database.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ZodFilter } from './utils/validation/zod.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  await DBConnection.initialize();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie Catalogue API - Marcus Vinicius')
    .setDescription(
      'API criada para o desafio da MKS - Desenvolvimento de sistemas',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new ZodFilter());
  await app.listen(3000);
}
bootstrap();
