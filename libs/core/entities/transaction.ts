import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./base";
import { InvoiceEntity } from "./invoice";


@Entity('Transaction')
export class TransactionEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    date: string

    @Column()
    payee: string

    @Column()
    amount: number

    @ManyToMany(() => InvoiceEntity)
    @JoinTable()
    invoices: InvoiceEntity[]
}