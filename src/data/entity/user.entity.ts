import { Column } from 'typeorm';
import { BaseEntity } from './base-abstract.entity';

export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
