import { Entity, Column } from 'typeorm';
import { PersonEntity } from './person';

@Entity("User")
export class UserEntity extends PersonEntity {
  @Column()
  password: string
  
  @Column({ unique: true })
  email: string

  @Column({ default: true })
  isActive: boolean;
}