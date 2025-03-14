import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto, GetAllBillingStatementQuery } from '@pos/core/dtos';
import { CompanyEntity, InvoiceEntity } from '@pos/core/entities';
import { PaginationResult } from '@pos/core/types';
import { Between, Equal, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class BillingStatementService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
    
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async getAll(query: GetAllBillingStatementQuery): Promise<PaginationResult<CompanyEntity>> {
    query.page = query.page ?? 1
    query.pageSize = query.pageSize ?? 10

    let [companies, total] = await this.companyRepository.findAndCount({ 
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      relations: {
        invoices: {
          transactions: true
        }
      },
      order: { 
        dateCreated: "desc",
      },
    });

    companies = companies.filter(company => company.totalBalance > 0)
    return { data: companies, total, ...query }
  }

   getOne(query: FindOptionsWhere<InvoiceEntity>): Promise<InvoiceEntity | null> {
      return this.invoiceRepository.findOne({
        where: query,
        relations: {
          transactions: true,
          company: true,
        },
        order: {
          transactions: {
            dateCreated: "desc"
          }
        }
      });
    }
  
  async remove(id: number): Promise<void> {
    await this.invoiceRepository.delete(id);
  }

  async create(dto: CreateCompanyDto) {
    const transaction = this.invoiceRepository.create(dto)
    return await transaction.save()
  }
}