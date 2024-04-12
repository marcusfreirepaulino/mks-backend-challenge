export interface MovieModel {
  id: number;
  name: string;
  description: string;
  director: string;
}

export type MovieInputModel = Omit<MovieModel, 'id'>;

export interface UpdateMovieInputModel extends Partial<MovieInputModel> {
  id: number;
}

export interface ListMoviesInputModel {
  page?: number;
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
