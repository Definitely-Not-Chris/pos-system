import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.getOrThrow<string>('DB_HOST'),
      port: this.configService.getOrThrow<number>('DB_PORT'),
      username: this.configService.getOrThrow<string>('DB_USERNAME'),
      password: this.configService.getOrThrow<string>('DB_PASSWORD'),
      database: this.configService.getOrThrow<string>('DB_DATABASE'),
      entities: [
        __dirname + '/../../../../libs/core/dist/entities/**/*{.ts,.js}',
      ],
      synchronize: this.configService.getOrThrow<boolean>('DB_SYNCHRONIZE', false), // Careful in production!
      autoLoadEntities: true, // Automatically load entities registered in the module
      logging: this.configService.getOrThrow<boolean>('DB_LOGGING', false),
    };
  }
}
