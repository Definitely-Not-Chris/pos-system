import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto, PaginationDto } from '@pos/core/dtos';
import { InvoiceEntity } from '@pos/core/entities';
import { PaginationResult } from '@pos/core/types';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private repository: Repository<InvoiceEntity>,
  ) {}

  async getAll(dto: PaginationDto = { page: 1, pageSize: 10 }): Promise<PaginationResult<InvoiceEntity>> {
    const [data, total] = await this.repository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      order: { dateCreated: "desc" }
    });

    return { data, total, ...dto }
  }

  getOne(query: Partial<InvoiceEntity>): Promise<InvoiceEntity | null> {
    return this.repository.findOneBy(query as any);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async create(dto: CreateInvoiceDto) {
    const invoice = this.repository.create(dto)
    return await invoice.save()
  }
}