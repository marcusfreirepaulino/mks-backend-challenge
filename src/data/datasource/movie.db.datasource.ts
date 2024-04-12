import {
  MovieInputModel,
  MovieModel,
  UpdateMovieInputModel,
} from 'src/model/movie.model';
import { DBConnection } from 'src/data/config/database.config';
import { MovieEntity } from 'src/data/entity/movie.entity';
import { Injectable } from '@nestjs/common';

interface FindManyParams {
  limit: number;
  offset: number;
}

@Injectable()
export class MovieDbDatasource {
  private readonly repository = DBConnection.getRepository(MovieEntity);

  insert(input: MovieInputModel): Promise<MovieModel> {
    return this.repository.save(input);
  }

  findOne(id: number): Promise<MovieModel | null> {
    return this.repository.findOneBy({ id });
  }

  findMany(input: FindManyParams): Promise<[MovieModel[], number]> {
    return this.repository.findAndCount({
      take: input.limit,
      skip: input.offset,
      order: { name: 'ASC' },
    });
  }

  async update(input: UpdateMovieInputModel): Promise<void> {
    await this.repository.update(input.id, {
      name: input.name,
      description: input.description,
      director: input.director,
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
