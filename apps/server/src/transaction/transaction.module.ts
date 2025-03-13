import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '@pos/core/entities/transaction';
import { InvoiceEntity } from '@pos/core/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, InvoiceEntity]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
