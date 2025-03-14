import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base";
import { InvoiceEntity } from "./invoice";


@Entity('Company')
export class CompanyEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    address: string

    @Column()
    contactNumber: string

    @OneToMany(() => InvoiceEntity, (invoices) => invoices.company)
    @JoinColumn()
    invoices: InvoiceEntity[]

    totalBalance: number = 0

    @AfterLoad()
    calculateTotalAmount() {
        if (this.invoices && this.invoices.length > 0) {
            this.totalBalance = this.invoices.reduce((c, p) => c + p.totalBalance, 0)
        }
    }
}