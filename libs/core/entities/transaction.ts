import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";
import { InvoiceEntity } from "./invoice";


@Entity('Transaction')
export class TransactionEntity extends BaseEntity {
    @Column()
    type: string

    @Column()
    amount: number

    @ManyToOne(() => InvoiceEntity, (invoices) => invoices.transactions)
    @JoinColumn()
    invoice: InvoiceEntity
}