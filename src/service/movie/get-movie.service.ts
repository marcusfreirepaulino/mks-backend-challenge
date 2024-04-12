import { Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';

@Injectable()
export class GetMovieService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(id: number) {
    const movie = await this.datasource.findOne(id);

    if (!movie) {
      throw new Error('Filme não encontrado.');
    }

    return movie;
  }
}
