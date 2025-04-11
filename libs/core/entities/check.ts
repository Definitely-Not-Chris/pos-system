import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base";


@Entity('Check')
export class CheckEntity extends BaseEntity {
    @Column()
    payee: string
    
    @Column()
    payerName: string
    
    @Column()
    payerAddress: string

    @Column()
    dateIssued: string

    @Column({ nullable: true })
    routingNumber: string
    
    @Column()
    accountNumber: string
    
    @Column({ nullable: true })
    memoLine: string

    @Column({ type: 'float' })
    amount: number

    @Column()
    bankFractional: string
}