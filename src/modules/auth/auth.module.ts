import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './service/auth.service';

import { User } from '../users/entities/user.entity';

import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

const configService = new ConfigService();

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '4h' },
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
