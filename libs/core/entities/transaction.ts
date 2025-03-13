import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";
import { InvoiceEntity } from "./invoice";


@Entity('Transaction')
export class TransactionEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    date: string

    @Column()
    type: string

    @Column()
    amount: number

    @ManyToOne(() => InvoiceEntity, (invoice) => invoice.transactions)
    @JoinTable()
    invoice: InvoiceEntity
}