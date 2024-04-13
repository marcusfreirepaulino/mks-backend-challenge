import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';
import { MovieModel } from 'src/model/movie.model';

@Injectable()
export class GetMovieService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(id: number): Promise<MovieModel> {
    const movie = await this.datasource.findOne(id);

    if (!movie) {
      throw new HttpException('Filme não encontrado.', HttpStatus.BAD_REQUEST);
    }

    return {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      director: movie.director,
    };
  }
}
