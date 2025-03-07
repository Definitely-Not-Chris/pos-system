import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base";


@Entity('Invoice')
export class InvoiceEntity extends BaseEntity {
    @Column()
    invoiceNumber: number

    @Column()
    name: string

    @Column()
    dateIssued: string

    @Column()
    billTo: string

    @Column()
    amount: number

    @Column()
    paymentDue: string
}