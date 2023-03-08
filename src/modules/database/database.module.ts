import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    //   TypeOrmModule.forRoot({
    //     type: 'mssql',
    //     host: 'localhost',
    //     port: 1433,
    //     username: 'Kroak',
    //     password: '791305',
    //     database: 'my_db',
    //     options: { encrypt: false },
    //     synchronize: false,

    //     entities: ['dist/**/*.entity.{ts,js}'],
    //     migrations: ['dist/migrations/*.{ts,js}'],
    //   }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
