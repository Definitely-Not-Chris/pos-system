import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata'; 
import env from '@pos/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.API_PORT ?? 3000);
}
bootstrap();
