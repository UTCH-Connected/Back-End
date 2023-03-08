import { DataSource, DataSourceOptions } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

// const configService = new ConfigService();

// export const config: SqlServerConnectionOptions = {
//   type: 'mssql',
//   port: 1433,
//   host: 'localhost',
//   database: configService.get('MSSQL_DB'),
//   username: configService.get('MSSQL_USER'),
//   password: configService.get('MSSQL_PASSWORD'),
//   synchronize: false,
//   options: { encrypt: false },

//   entities: ['src/**/*.entity.{ts,js}'],
//   migrations: ['dist/migrations/*.{ts,js}'],
// };

export const dataSourceOptions: DataSourceOptions = {
  type: 'mssql',
  port: 1433,
  host: 'localhost',
  database: 'my_db',
  username: 'Kroak',
  password: '791305',
  synchronize: false,
  options: { encrypt: false },

  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  // migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
