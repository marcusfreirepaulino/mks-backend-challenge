import { z } from 'zod';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;

export const userSchema = z.object({
  name: z.string().max(100),
  email: z.string().email('Email inválido.'),
  password: z
    .string()
    .min(8, 'Uma senha válida deve ter pelo menos 8 caracteres.')
    .regex(PASSWORD_REGEX, 'Uma senha válida deve ter uma letra e um digíto.'),
});
