import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { PaginationDto, PaginationSchema, RegisterUserDto, RegisterUserSchema } from '@pos/core/dtos';

// @UseGuards(AuthGuard)
@Controller('v1/users')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    // @UsePipes(new ZodValidationPipe(PaginationSchema))
    // getAllUser (@Query() dto: PaginationDto) {
    getAllUser () {
        return this.userService.getAll()
    }

    @Post()
    @UsePipes(new ZodValidationPipe(RegisterUserSchema))
    createUser(@Body() dto: RegisterUserDto) {
        return this.userService.create(dto)
    }
}
