import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { config } from 'dotenv';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { join } from 'path';

config();

const configService = new ConfigService();

export const dataSourceOptions: SqlServerConnectionOptions = {
  type: 'mssql',
  port: parseInt(configService.get('MSSQL_PORT')),
  host: configService.get('MSSQL_HOST'),
  database: configService.get('MSSQL_DB'),
  username: configService.get('MSSQL_USER'),
  password: configService.get('MSSQL_PASSWORD'),
  entities: [join('dist', '**', '*.entity.{ts,js}')],
  migrations: [join('dist', 'migrations', '*.{ts,js}')],
  extra: {
    trustServerCertificate: true,
  },

  // migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
