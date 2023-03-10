import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './controller/profile.controller';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './service/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [TypeOrmModule.forFeature([Profile])],
})
export class ProfileModule {}
