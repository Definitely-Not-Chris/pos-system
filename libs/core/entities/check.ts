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

    @Column()
    routingNumber: string
    
    @Column()
    accountNumber: string
    
    @Column()
    memoLine: string

    @Column()
    amount: number

    @Column()
    bankFractional: string
}