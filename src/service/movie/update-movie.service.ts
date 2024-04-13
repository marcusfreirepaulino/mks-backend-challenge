import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';
import { UpdateMovieInputModel } from 'src/model/movie.model';

@Injectable()
export class UpdateMovieService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(id: number, input: UpdateMovieInputModel): Promise<string> {
    const movie = await this.datasource.findOne(id);

    if (!movie) {
      throw new HttpException('Filme não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.datasource.update({ id, ...input });

    return 'Filme atuaizado com sucesso.';
  }
}
