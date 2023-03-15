import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { SetMetadata } from '@nestjs/common';
import config from './config/config';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { PostModule } from './modules/post.module';
import { PostModule } from './modules/post/post.module';

const configService = new ConfigService();

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    JwtModule.register({
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '4h' },
    }),
    UsersModule,
    DatabaseModule,
    ProfileModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'JWT_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}
