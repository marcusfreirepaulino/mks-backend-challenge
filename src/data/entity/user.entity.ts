import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-abstract.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
