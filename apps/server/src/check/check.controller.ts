import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CheckService } from './check.service';
import { CreateCheckDto } from '@pos/core/dtos';

@Controller('v1/checks')
export class CheckController {
  constructor(private readonly service: CheckService) {}

  @Post()
  create(@Body() dto: CreateCheckDto) {
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
