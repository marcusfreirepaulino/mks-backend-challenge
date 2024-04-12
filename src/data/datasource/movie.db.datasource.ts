import { MovieInputModel, MovieModel } from 'src/model/movie.model';
import { DBConnection } from 'src/data/config/database.config';
import { MovieEntity } from 'src/data/entity/movie.entity';
import { Injectable } from '@nestjs/common';

interface UpdateParams extends Partial<MovieInputModel> {
  id: number;
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

  async update(input: UpdateParams): Promise<void> {
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
