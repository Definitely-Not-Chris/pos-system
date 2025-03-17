import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { PaginationDto, PaginationSchema, RegisterUserDto, RegisterUserSchema, UpdateUserDto } from '@pos/core/dtos';

// @UseGuards(AuthGuard)
@Controller('v1/users')
export class UserController {
    constructor(private service: UserService){}

    @Get()
    // @UsePipes(new ZodValidationPipe(PaginationSchema))
    // getAllUser (@Query() dto: PaginationDto) {
    getAllUser () {
        return this.service.getAll()
    }

    @Post()
    @UsePipes(new ZodValidationPipe(RegisterUserSchema))
    createUser(@Body() dto: RegisterUserDto) {
        return this.service.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.service.update(id, dto);
    }
}
