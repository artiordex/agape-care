/**
 * Description : auth.module.ts - 📌 인증 모듈
 * Author : Shiwoo Min
 * Date : 2026-01-26
 */

import { PrismaService } from '@agape-care/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: {
          // jsonwebtoken 은 "1h", "7d" 등을 잘 처리하므로
          // 타입스크립트만 any 캐스팅으로 눌러줍니다.
          expiresIn: config.get('JWT_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
