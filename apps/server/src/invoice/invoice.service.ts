import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto, PaginationDto } from '@pos/core/dtos';
import { CompanyEntity, InvoiceEntity } from '@pos/core/entities';
import { PaginationResult } from '@pos/core/types';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
    
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async getAll(dto: PaginationDto = { page: 1, pageSize: 10 }): Promise<PaginationResult<InvoiceEntity>> {
    const [data, total] = await this.invoiceRepository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      relations: {
        transactions: true,
        company: true
      },
      order: { 
        dateCreated: "desc",
        transactions: {
          dateCreated: "desc"
        }
      },
    });

    return { data, total, ...dto }
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

  async create(dto: CreateInvoiceDto) {
    const invoice = this.invoiceRepository.create(dto)
    const company = await this.companyRepository.findOneBy({ id: invoice.company.id })
    invoice.company = company

    return await invoice.save()
  }
}