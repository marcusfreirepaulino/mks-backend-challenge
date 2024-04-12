import * as path from 'node:path';
import { DataSource } from 'typeorm';

export const DBConnection = new DataSource({
  type: 'postgres',
  entities: [path.join(__dirname + '..') + '/entity/*.{ts,js}'],
  url: process.env.DATABASE_URL,
});
