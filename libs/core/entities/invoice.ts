import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base";
import { TransactionEntity } from "./transaction";
import { CompanyEntity } from "./company";


@Entity('Invoice')
export class InvoiceEntity extends BaseEntity {
    @Column()
    invoiceNumber: number

    @Column()
    name: string

    @Column()
    dateIssued: string

    @Column()
    amount: number

    @Column()
    paymentDue: string

    @OneToOne(() => CompanyEntity)
    @JoinColumn()
    company: CompanyEntity

    @ManyToMany(() => TransactionEntity)
    @JoinTable()
    transactions: TransactionEntity[]
}