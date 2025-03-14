import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, InvoiceEntity } from '@pos/core/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity, CompanyEntity]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
