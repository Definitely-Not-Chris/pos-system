import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto, GetAllBillingStatementQuery } from '@pos/core/dtos';
import { InvoiceEntity } from '@pos/core/entities';
import { PaginationResult } from '@pos/core/types';
import { Between, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class BillingStatementService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private repository: Repository<InvoiceEntity>,
  ) {}

  async getAll(query: GetAllBillingStatementQuery = { page: 1, pageSize: 10 }): Promise<PaginationResult<InvoiceEntity>> {
    const [data, total] = await this.repository.findAndCount({ 
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      where: {
        dateCreated: Between(query.startDate, query.endDate)
      },
      relations: {
        transactions: true
      },
      order: { 
        dateCreated: "desc",
      },
    });

    return { data, total, ...query }
  }

   getOne(query: FindOptionsWhere<InvoiceEntity>): Promise<InvoiceEntity | null> {
      return this.repository.findOne({
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
    await this.repository.delete(id);
  }

  async create(dto: CreateCompanyDto) {
    const transaction = this.repository.create(dto)
    return await transaction.save()
  }
}