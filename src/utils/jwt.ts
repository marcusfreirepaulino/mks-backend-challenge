import { sign } from 'jsonwebtoken';

const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const JWT_SECRET = process.env.JWT_SECRET;

export function signJwt<T>(payload: T): string {
  return sign({ data: payload }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
}
