import { z } from 'zod';

export const movieSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(500),
  director: z.string().max(100),
});

export const listMoviesSchema = z.object({
  page: z
    .number()
    .nonnegative('O parâmetro page deve ser um número positivo.')
    .optional(),
  limit: z
    .number()
    .nonnegative('O parâmetro page deve ser um número positivo.')
    .optional(),
});
