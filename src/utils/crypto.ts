import * as crypto from 'node:crypto';

const DEFAULT_SALT = process.env.CRYPTO_SALT;
const DEFAULT_PASSWORD_LENGHT = +process.env.CRYPTO_DEFAULT_PASSWORD_LENGHT;

export function generateHashWithSalt(
  value: string,
  salt = DEFAULT_SALT,
): string {
  return crypto.scryptSync(value, salt, 64).toString('base64');
}

export function generateRandomPassword(): string {
  return crypto.randomBytes(DEFAULT_PASSWORD_LENGHT).toString('hex');
}
