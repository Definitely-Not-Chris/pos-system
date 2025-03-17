import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@pos/core/entities'
import { PaginationDto, RegisterUserDto, UpdateUserDto } from '@pos/core/dtos';
import { PaginationResult } from '@pos/core/types';
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async getAll(dto: PaginationDto = { page: 1, pageSize: 10 }): Promise<PaginationResult<UserEntity>> {
    const [data, total] = await this.repository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
      order: { dateCreated: "desc" }
    });

    return { data, total, ...dto }
  }

  getOne(query: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.repository.findOneBy(query as any);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async update(id: number, dto: UpdateUserDto) {
    const invoice = await this.repository.findOneBy({ id });

    if (!invoice) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    if(dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    this.repository.merge(invoice, dto);
    return this.repository.save(invoice);
  }

  async create(dto: RegisterUserDto) {
    dto.password = await bcrypt.hash(dto.password, 10);
    const user = this.repository.create(dto)
    return await user.save()
  }
}