import { DataSource } from 'typeorm';
import { Photo } from '@pos/core/dist/entity/photo';

export const photoProviders = [
    {
      provide: 'PHOTO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
      inject: ['DATA_SOURCE'],
    },
  ];