import { Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';
import { UpdateMovieInputModel } from 'src/model/movie.model';

@Injectable()
export class UpdateMovieService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(input: UpdateMovieInputModel): Promise<string> {
    const movie = await this.datasource.findOne(input.id);

    if (!movie) {
      throw new Error('Filme não encontrado.');
    }

    await this.datasource.update(input);

    return 'Filme atuaizado com sucesso.';
  }
}
