import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import env from '@pos/env'
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';


@Module({
  imports: [
    DatabaseModule, 
    AuthModule, 
    UserModule,
    JwtModule,
    RoleModule,
    ConfigModule.forRoot({
      load: [() => env],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
