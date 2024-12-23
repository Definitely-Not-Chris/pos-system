import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';


export const databaseProviders = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'pos',
    entities: [
      __dirname + '/../../../core/dist/entity/**/*{.ts,.js}',
    ],
    synchronize: true,
    logging: true
  }),
    // {
    //   provide: 'DATA_SOURCE',
    //   useFactory: async () => {
    //     const dataSource = new DataSource({
    //       type: 'postgres',
    //       host: 'localhost',
    //       port: 5432,
    //       username: 'postgres',
    //       password: 'admin',
    //       database: 'pos',
    //       entities: [
    //         __dirname + '/../../../core/dist/entity/**/*{.ts,.js}',
    //       ],
    //       synchronize: true,
    //       logging: true
    //     });
  
    //     return dataSource.initialize();
    //   },
    // },
  ];