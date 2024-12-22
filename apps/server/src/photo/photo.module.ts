import { Module } from '@nestjs/common';
import { photoProviders } from './photo.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PhotoService } from './photo.service';

@Module({
    imports: [DatabaseModule],
    providers: [
      ...photoProviders,
      PhotoService,
    ],
  })
  export class PhotoModule {}