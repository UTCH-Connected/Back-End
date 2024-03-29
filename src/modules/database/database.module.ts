import { Global, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      ...dataSourceOptions,
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
