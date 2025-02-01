import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@pos/core/entities'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(query: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(query as any);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}