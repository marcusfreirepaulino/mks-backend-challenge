import { Module } from '@nestjs/common';
import { MoviesController } from '../controller/movies.controller';
import { CreateMovieService } from '../service/movie/create-movie.service';
import { GetMovieService } from '../service/movie/get-movie.service';
import { ListMoviesService } from '../service/movie/list-movies.service';
import { UpdateMovieService } from '../service/movie/update-movie.service';
import { DeleteMovieService } from '../service/movie/delete-movie.service';
import { MovieDbDatasource } from '../data/datasource/movie.db.datasource';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [
    MovieDbDatasource,
    CreateMovieService,
    GetMovieService,
    ListMoviesService,
    UpdateMovieService,
    DeleteMovieService,
  ],
})
export class MoviesModule {}
