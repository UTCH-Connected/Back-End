import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: configService.get('MSSQL_HOST'),
        port: configService.get('MSSQL_PORT'),
        username: configService.get('MSSQL_USER'),
        password: configService.get('MSSQL_PASSWORD'),
        database: configService.get('MSSQL_DB'),
        synchronize: false,

        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        migrations: [__dirname + '/migrations/*.{ts,js}'],
      });
      return dataSource.initialize();
    },
  },
];
