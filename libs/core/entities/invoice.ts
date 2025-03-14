import { AfterLoad, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
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

    @Column()
    amount: number

    @ManyToOne(() => CompanyEntity, (company) => company.invoices)
    @JoinColumn()
    company: CompanyEntity

    totalBalance: number = 0

    @ManyToMany(() => TransactionEntity, (transactions) => transactions.invoices)
    @JoinTable({ name: "InvoiceTransactions" })
    transactions: TransactionEntity[]

    @AfterLoad()
    calculateTotalAmount() {
      if (this.transactions && this.transactions.length > 0) {
        this.totalBalance = this.transactions.filter(item => item.type == 'Payment').reduce((c, p) => c + p.amount, 0)
        this.totalBalance = this.amount - this.totalBalance
      }
    }
}