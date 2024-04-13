import { Module } from '@nestjs/common';
import { MoviesModule } from './movies.module';
import { UserModule } from './user.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MoviesModule,
    UserModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
