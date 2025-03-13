import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from '@pos/core/dtos';

@Controller('v1/transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.getOne({ id });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoiceService.update(+id, updateInvoiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invoiceService.remove(+id);
  // }
}
