import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from '@pos/core/dtos';

@Controller('v1/invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
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
