import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, PaginationDto } from '@pos/core/dtos';

@Controller('v1/transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    query.page = query.page ?? 1
    query.pageSize = query.pageSize ?? 10
    return this.service.getAll(query);
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
