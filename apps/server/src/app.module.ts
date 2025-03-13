import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CheckModule } from './check/check.module';
import { TransactionModule } from './transaction/transaction.module';


@Module({
  imports: [
    DatabaseModule, 
    AuthModule, 
    UserModule,
    JwtModule,
    RoleModule,
    InvoiceModule,
    CheckModule,
    TransactionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env' 
        // process.env.NODE_ENV == "development" ? '.env.development' : '',
        // process.env.NODE_ENV == "production" ? '.env.production' : '',
      ]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
