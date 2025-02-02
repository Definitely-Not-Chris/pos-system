import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleEnum } from '@pos/core/enums/role';

@UseGuards(AuthGuard)
@Controller('/v1/roles')
export class RoleController {
    // constructor(private roleService: RoleService){}

    @Get()
    getAllRole(): string[] {
        return [RoleEnum.ADMIN, RoleEnum.CASHIER];
    }
}
