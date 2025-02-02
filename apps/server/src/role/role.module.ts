import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@pos/core/entities';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [RoleController],
    providers: [JwtService, ConfigService]
})
export class RoleModule {}
