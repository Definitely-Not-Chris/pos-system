import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";
import { InvoiceEntity } from "./invoice";


@Entity('Transaction')
export class TransactionEntity extends BaseEntity {
    @Column()
    type: string

    @Column()
    amount: number

    @ManyToMany(() => InvoiceEntity, (invoices) => invoices.transactions)
    @JoinTable({ name: "TransactionInvoices" })
    invoices: InvoiceEntity[]
}