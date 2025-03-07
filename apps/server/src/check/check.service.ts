import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCheckDto, PaginationDto } from '@pos/core/dtos';
import { CheckEntity } from '@pos/core/entities';
import { PaginationResult } from '@pos/core/types';
import { Repository } from 'typeorm';

@Injectable()
export class CheckService {
  constructor(
    @InjectRepository(CheckEntity)
    private repository: Repository<CheckEntity>,
  ) {}

  async getAll(dto: PaginationDto = { page: 1, pageSize: 10 }): Promise<PaginationResult<CheckEntity>> {
    const [data, total] = await this.repository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      order: { dateCreated: "desc" }
    });

    return { data, total, ...dto }
  }

  getOne(query: Partial<CheckEntity>): Promise<CheckEntity | null> {
    return this.repository.findOneBy(query as any);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async create(dto: CreateCheckDto) {
    const check = this.repository.create(dto)
    return await check.save()
  }
}