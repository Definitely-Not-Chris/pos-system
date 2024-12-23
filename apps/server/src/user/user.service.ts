import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@pos/core/dist/entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: User): Promise<User> {
    return this.userRepository.create(user)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(query: Partial<User>): Promise<User | null> {
    return this.userRepository.findOneBy(query);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}