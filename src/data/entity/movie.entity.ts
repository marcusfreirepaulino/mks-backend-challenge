import { Column } from 'typeorm';
import { BaseEntity } from './base-abstract.entity';

export class MovieEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  director: string;
}
