import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto, PaginationDto } from '@pos/core/dtos';
import { InvoiceEntity } from '@pos/core/entities';
import { TransactionEntity } from '@pos/core/entities/transaction';
import { PaginationResult } from '@pos/core/types';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async getAll(dto: PaginationDto = { page: 1, pageSize: 10 }): Promise<PaginationResult<TransactionEntity>> {
    const [data, total] = await this.transactionRepository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      relations: {
        invoice: true
      },
      order: { 
        dateCreated: "desc",
      },
    });

    return { data, total, ...dto }
  }

  getOne(query: Partial<TransactionEntity>): Promise<TransactionEntity | null> {
    return this.transactionRepository.findOneBy(query as any);
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async create(dto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(dto)
    await transaction.save()
    
    const invoice = await this.invoiceRepository.findOne({ 
      where: { id: dto.invoiceId },
      relations: {
        transactions: true
      } 
    })
    
    invoice.transactions = invoice.transactions || []
    invoice.transactions.push(transaction)
    return await invoice.save()
  }
}