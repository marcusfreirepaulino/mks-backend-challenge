import { ApiProperty } from '@nestjs/swagger';

export interface MovieModel {
  id: number;
  name: string;
  description: string;
  director: string;
}

export class MovieInputModel implements Omit<MovieModel, 'id'> {
  @ApiProperty({ example: 'Taxi Driver', minLength: 1, maxLength: 100 })
  name: string;

  @ApiProperty({
    example:
      'Um veterano de guerra mentalmente instável trabalha à noite como taxista na cidade de Nova Iorque, onde a decadência e o desprezo alimentam seu desejo de ação violenta.',
    minLength: 1,
    maxLength: 500,
  })
  description: string;

  @ApiProperty({ example: 'Martin Scorsese', minLength: 1, maxLength: 100 })
  director: string;
}

export class UpdateMovieInputModel implements Partial<MovieInputModel> {
  @ApiProperty({
    example: 'Taxi Driver',
    nullable: true,
    minLength: 1,
    maxLength: 100,
  })
  name?: string;

  @ApiProperty({
    example:
      'Um veterano de guerra mentalmente instável trabalha à noite como taxista na cidade de Nova Iorque, onde a decadência e o desprezo alimentam seu desejo de ação violenta.',
    nullable: true,
    minLength: 1,
    maxLength: 500,
  })
  description?: string;

  @ApiProperty({
    example: 'Martin Scorsese',
    nullable: true,
    minLength: 1,
    maxLength: 100,
  })
  director?: string;
}

export class ListMoviesInputModel {
  @ApiProperty({ nullable: true, example: 1, minimum: 1, type: 'number' })
  page?: number;

  @ApiProperty({ nullable: true, example: 10, minimum: 1, type: 'number' })
  limit?: number;
}

export interface PaginatedMoviesModel {
  movies: MovieModel[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
