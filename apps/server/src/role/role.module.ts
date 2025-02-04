import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@pos/core/entities';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule
    ],
    controllers: [RoleController],
    providers: []
})
export class RoleModule {}
