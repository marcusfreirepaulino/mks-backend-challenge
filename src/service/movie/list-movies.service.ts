import { Injectable } from '@nestjs/common';
import { MovieDbDatasource } from 'src/data/datasource/movie.db.datasource';
import {
  ListMoviesInputModel,
  PaginatedMoviesModel,
} from 'src/model/movie.model';

@Injectable()
export class ListMoviesService {
  constructor(private readonly datasource: MovieDbDatasource) {}

  async exec(input: ListMoviesInputModel): Promise<PaginatedMoviesModel> {
    const limit = input.limit ?? 10;
    const page = input.page ?? 1;
    const offset = (page - 1) * limit;
    const [movies, total] = await this.datasource.findMany({
      limit,
      offset,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      movies,
      total,
      totalPages,
      limit,
      page,
      hasNextPage: total > offset + limit,
      hasPreviousPage: offset > 0,
    };
  }
}
