import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-abstract.entity';

@Entity('movie')
export class MovieEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  director: string;
}
