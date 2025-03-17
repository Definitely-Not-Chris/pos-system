import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto, PaginationDto } from '@pos/core/dtos';
import { InvoiceEntity } from '@pos/core/entities';
import { TransactionEntity } from '@pos/core/entities/transaction';
import { PaginationResult } from '@pos/core/types';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async getAll(dto: PaginationDto): Promise<PaginationResult<TransactionEntity>> {
    let search: FindOptionsWhere<TransactionEntity>[] = []
    
    if(dto.search) {
      const like = ILike(`%${dto.search}%`)

      search = [
        { invoice: { company: { name: like } }},
        { invoice: { name: like }},
        { invoice: { invoiceNumber: Number(dto.search) || 0 }},
        { type: like },
        { id: Number(dto.search) || 0 }
      ]
    }
    
    const [data, total] = await this.transactionRepository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      relations: {
        invoice: {
          company: true
        }
      },
      where: search,
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
      where: { id: dto.invoice.id },
      relations: {
        transactions: true
      } 
    })
    
    invoice.transactions = invoice.transactions || []
    invoice.transactions.push(transaction)
    return await invoice.save()
  }
}