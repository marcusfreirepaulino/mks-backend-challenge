import { DataSource } from 'typeorm';
import { MovieEntity } from '../entity/movie.entity';
import { UserEntity } from '../entity/user.entity';

export const DBConnection = new DataSource({
  type: 'postgres',
  entities: [MovieEntity, UserEntity],
  url: process.env.DATABASE_URL,
  synchronize: true,
});
