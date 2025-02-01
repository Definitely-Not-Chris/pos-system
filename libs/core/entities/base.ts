import { DeleteDateColumn, CreateDateColumn, UpdateDateColumn, BaseEntity as TypeOrmBaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateCreated: Date; 

  @UpdateDateColumn()
  dateUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;  
}