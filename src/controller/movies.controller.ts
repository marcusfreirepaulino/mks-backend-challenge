import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
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
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly createMovieService: CreateMovieService,
    private readonly getMovieService: GetMovieService,
    private readonly listMoviesService: ListMoviesService,
    private readonly updateMovieService: UpdateMovieService,
    private readonly deleteMovieService: DeleteMovieService,
  ) {}

  @ApiOperation({ summary: 'Cria um novo filme' })
  @ApiTags('Movies')
  @Post()
  @UseGuards(AuthGuard)
  create(@Query() input: MovieInputModel): Promise<MovieModel> {
    return this.createMovieService.exec(input);
  }

  @ApiOperation({ summary: 'Lista os filmes do catálogo de forma paginada' })
  @ApiTags('Movies')
  @UseInterceptors(CacheInterceptor)
  @Get()
  @UseGuards(AuthGuard)
  listMovies(
    @Query() input: ListMoviesInputModel,
  ): Promise<PaginatedMoviesModel> {
    return this.listMoviesService.exec(input);
  }

  @ApiOperation({ summary: 'Lista as informações de um filme pelo seu id' })
  @ApiTags('Movies')
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  @UseGuards(AuthGuard)
  getMovie(@Param('id') id: number): Promise<MovieModel> {
    return this.getMovieService.exec(id);
  }

  @ApiOperation({ summary: 'Atualiza as informações de filme' })
  @ApiTags('Movies')
  @Put(':id')
  @UseGuards(AuthGuard)
  updateMovie(
    @Param('id') id: number,
    @Query() input: UpdateMovieInputModel,
  ): Promise<string> {
    return this.updateMovieService.exec(id, input);
  }

  @ApiOperation({ summary: 'Deleta um filme do catálogo' })
  @ApiTags('Movies')
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteMovie(@Param('id') id: number): Promise<string> {
    return this.deleteMovieService.exec(id);
  }
}
