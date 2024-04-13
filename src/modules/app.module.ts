import { Module } from '@nestjs/common';
import { MoviesModule } from './movies.module';
import { UserModule } from './user.module';

@Module({
  imports: [MoviesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
