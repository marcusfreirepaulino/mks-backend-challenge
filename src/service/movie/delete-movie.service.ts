import { Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';

@Injectable()
export class DeleteMovieService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(id: number): Promise<string> {
    const movie = await this.datasource.findOne(id);

    if (!movie) {
      throw new Error('Filme não encontrado.');
    }

    await this.datasource.delete(id);

    return 'Filme deletado com sucesso.';
  }
}
