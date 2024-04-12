export interface MovieModel {
  id: number;
  name: string;
  description: string;
  director: string;
}

export type MovieInputModel = Omit<MovieModel, 'id'>;
