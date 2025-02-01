import { Column } from 'typeorm';
import { BaseEntity } from './base';

export abstract class PersonEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column({ nullable: true })
  middleName: string;

  // @Column('date')
  // birthdate: string

  // @Column({ update: false })
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  
  // @Column({ type: 'smallint', update: false })
  // get age(): number {
  //   const birthdate = moment(this.birthdate)
  //   return moment().diff(birthdate, 'years')
  // }
}