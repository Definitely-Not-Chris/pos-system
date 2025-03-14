import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto, PaginationDto } from '@pos/core/dtos';
import { CompanyEntity } from '@pos/core/entities/company';
import { PaginationResult } from '@pos/core/types';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private repository: Repository<CompanyEntity>,
  ) {}

  async getAll(dto: PaginationDto = { page: 1, pageSize: 10 }): Promise<PaginationResult<CompanyEntity>> {
    const [data, total] = await this.repository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      relations: {
        invoices: {
          transactions: true
        }
      },
      order: { 
        dateCreated: "desc",
      },
    });

    return { data, total, ...dto }
  }

  getOne(query: FindOptionsWhere<CompanyEntity>): Promise<CompanyEntity | null> {
     return this.repository.findOne({
       where: query,
       relations: {
        invoices: {
          transactions: true
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