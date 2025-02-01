import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@pos/core/entities';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        JwtModule,
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService, ConfigService]
})
export class AuthModule {}
