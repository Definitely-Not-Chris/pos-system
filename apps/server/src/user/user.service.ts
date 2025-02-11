import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@pos/core/entities'
import { PaginationDto } from '@pos/core/dtos';
import { PaginationResult } from '@pos/core/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(dto: PaginationDto = { page: 1, pageSize: 10 }): Promise<PaginationResult<UserEntity>> {
    const [data, total] = await this.userRepository.findAndCount({ 
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.page
    });

    return { data, total, ...dto }
  }

  getOne(query: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(query as any);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}