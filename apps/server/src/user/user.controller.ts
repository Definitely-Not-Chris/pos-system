import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { PaginationDto, PaginationSchema } from '@pos/core/dtos';

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
}
