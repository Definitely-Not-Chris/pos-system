import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person';

@Entity()
export class User extends Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  password: string
  
  @Column({ unique: true })
  email: string

  @Column({ default: true })
  isActive: boolean;
}