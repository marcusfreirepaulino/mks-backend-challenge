import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth/auth.guard';
import {
  ListMoviesInputModel,
  MovieInputModel,
  MovieModel,
  PaginatedMoviesModel,
  UpdateMovieInputModel,
} from 'src/model/movie.model';
import { CreateMovieService } from 'src/service/movie/create-movie.service';
import { DeleteMovieService } from 'src/service/movie/delete-movie.service';
import { GetMovieService } from 'src/service/movie/get-movie.service';
import { ListMoviesService } from 'src/service/movie/list-movies.service';
import { UpdateMovieService } from 'src/service/movie/update-movie.service';
import { ZodPipe } from 'src/utils/validation/zod.pipe';
import {
  listMoviesSchema,
  movieSchema,
} from 'src/service/validators/movies.validators';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly createMovieService: CreateMovieService,
    private readonly getMovieService: GetMovieService,
    private readonly listMoviesService: ListMoviesService,
    private readonly updateMovieService: UpdateMovieService,
    private readonly deleteMovieService: DeleteMovieService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() input: MovieInputModel): Promise<MovieModel> {
    return this.createMovieService.exec(input);
  }

  @Get()
  @UseGuards(AuthGuard)
  listMovies(
    @Body(new ZodPipe(listMoviesSchema)) input: ListMoviesInputModel,
  ): Promise<PaginatedMoviesModel> {
    return this.listMoviesService.exec(input);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getMovie(@Param('id') id: number): Promise<MovieModel> {
    return this.getMovieService.exec(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateMovie(
    @Param('id') id: number,
    @Body(new ZodPipe(movieSchema)) input: UpdateMovieInputModel,
  ): Promise<string> {
    return this.updateMovieService.exec(id, input);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteMovie(@Param('id') id: number): Promise<string> {
    return this.deleteMovieService.exec(id);
  }
}
