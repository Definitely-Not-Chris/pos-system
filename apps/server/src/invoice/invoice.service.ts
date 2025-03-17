import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto, PaginationDto, UpdateInvoiceDto } from '@pos/core/dtos';
import { CompanyEntity, InvoiceEntity } from '@pos/core/entities';
import { PaginationResult } from '@pos/core/types';
import { FindOptionsWhere, ILike, Like, Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
    
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async getAll(dto: PaginationDto): Promise<PaginationResult<InvoiceEntity>> {
    let search: FindOptionsWhere<InvoiceEntity>[] = []

    if(dto.search) {
      const like = ILike(`%${dto.search}%`)
      search = [
        { company: { name: like } },
        { name: like },
        { invoiceNumber: Number(dto.search) || 0 },
      ]
    }
    
    const [data, total] = await this.invoiceRepository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      relations: {
        transactions: true,
        company: true
      },
      where: search,
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

  async update(id: number, dto: UpdateInvoiceDto) {
    const invoice = await this.invoiceRepository.findOneBy({ id });

    if (!invoice) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    this.invoiceRepository.merge(invoice, dto);
    return this.invoiceRepository.save(invoice);
  }

  async create(dto: CreateInvoiceDto) {
    const invoice = this.invoiceRepository.create(dto)
    const company = await this.companyRepository.findOneBy({ id: invoice.company.id })
    invoice.company = company

    return await invoice.save()
  }
}