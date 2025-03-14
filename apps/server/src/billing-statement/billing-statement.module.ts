import { Module } from '@nestjs/common';
import { BillingStatementService } from './billing-statement.service';
import { BillingStatementController } from './billing-statement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, InvoiceEntity } from '@pos/core/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, InvoiceEntity]),
  ],
  controllers: [BillingStatementController],
  providers: [BillingStatementService],
})
export class BillingStatementModule {}
