import { Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';
import { MovieInputModel, MovieModel } from 'src/model/movie.model';

@Injectable()
export class CreateMovieService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(input: MovieInputModel): Promise<MovieModel> {
    return this.datasource.insert(input);
  }
}
