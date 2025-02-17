import { Column } from 'typeorm';
import { BaseEntity } from './base';

export abstract class PersonEntity extends BaseEntity {
  @Column({
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value
    }
  })
  firstName: string;

  @Column({
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value
    }
  })
  lastName: string;
  
  @Column({ 
    nullable: true,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value
    }
  })
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