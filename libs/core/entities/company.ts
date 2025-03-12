import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base";


@Entity('Company')
export class CompanyEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    address: string

    @Column()
    contactNumber: string
}