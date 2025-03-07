import { Module } from '@nestjs/common';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckEntity } from '@pos/core/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckEntity]),
  ],
  controllers: [CheckController],
  providers: [CheckService],
})
export class CheckModule {}
