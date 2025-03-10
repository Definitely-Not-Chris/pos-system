import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useClass: TypeOrmConfigService,
        inject: [ConfigService],
    })]
})
export class DatabaseModule {}
