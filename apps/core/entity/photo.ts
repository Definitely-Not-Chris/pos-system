import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column({ generatedType: 'STORED', asExpression: `name || ' ' || description` })
  filename: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;
}