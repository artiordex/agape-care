/**
 * Description : app.module.ts - 📌 Agape-Care 요양원 ERP 기본 NestJS 루트 모듈
 * Author : Shiwoo Min
 * Date : 2026-01-25
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    /* 환경 변수 설정 (전역) */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
      expandVariables: true,
    }),

    /* 스케줄러 모듈 (크론/배치 작업) */
    ScheduleModule.forRoot(),

    /* API Rate Limit (요청 제한) */
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL') || 60000, // 기본: 60초
          limit: config.get('THROTTLE_LIMIT') || 100, // 기본: 100회
        },
      ],
    }),
  ],

  controllers: [],

  providers: [
    /* 전역 Rate Limiting Guard */
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 기본 버전에서는 미들웨어 없음
  }

  async onModuleInit() {
    console.log('Agape-Care ERP API (Minimal Version) Starting...');
    console.log('Environment:', process.env.NODE_ENV || 'development');
  }

  async onModuleDestroy() {
    console.log('Agape-Care ERP API Server Shutting down...');
  }
}
