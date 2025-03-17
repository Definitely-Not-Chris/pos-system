import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BillingStatementService } from './billing-statement.service';
import { CreateCompanyDto, GetAllBillingStatementQuery } from '@pos/core/dtos';

@Controller('v1/billing-statements')
export class BillingStatementController {
  constructor(private readonly service: BillingStatementService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: GetAllBillingStatementQuery) {
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
