import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';

@Injectable()
export class DeleteMovieService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(id: number): Promise<string> {
    const movie = await this.datasource.findOne(id);

    if (!movie) {
      throw new HttpException('Filme não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.datasource.delete(id);

    return 'Filme deletado com sucesso.';
  }
}
