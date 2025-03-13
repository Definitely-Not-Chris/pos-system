import { AfterLoad, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
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
    paymentDue: string

    @OneToOne(() => CompanyEntity)
    @JoinColumn()
    company: CompanyEntity

    amount: number = 0

    @OneToMany(() => TransactionEntity, (transactions) => transactions.invoice)
    @JoinTable({ name: "InvoiceTransactions" })
    transactions: TransactionEntity[]

    @AfterLoad()
    calculateTotalAmount() {
      if (this.transactions && this.transactions.length > 0) {
        this.amount = this.transactions.reduce((c, p) => c + p.amount, 0)
      }
    }
}