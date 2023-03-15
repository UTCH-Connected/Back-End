import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { config } from 'dotenv';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { join } from 'path';
import { User } from '../users/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Post } from '@nestjs/common';

config();

const configService = new ConfigService();

export const dataSourceOptions: SqlServerConnectionOptions = {
  type: 'mssql',
  port: parseInt(configService.get('MSSQL_PORT')),
  host: configService.get('MSSQL_HOST'),
  database: configService.get('MSSQL_DB'),
  username: configService.get('MSSQL_USER'),
  password: configService.get('MSSQL_PASSWORD'),
  entities: [User, Profile, Post],
  migrations: [join('dist', 'migrations', '*.{ts,js}')],
  extra: {
    trustServerCertificate: true,
  },

  // migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
