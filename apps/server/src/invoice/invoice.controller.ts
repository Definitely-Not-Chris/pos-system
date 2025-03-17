import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, PaginationDto, UpdateInvoiceDto } from '@pos/core/dtos';

@Controller('v1/invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
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

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateInvoiceDto) {
    return this.service.update(id, dto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invoiceService.remove(+id);
  // }
}
