/**
 * Description : app.module.ts - 📌 Agape-Care Minimal Auth API
 * Author : Shiwoo Min
 * Date : 2026-01-26
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from '@agape-care/logger';
import { DatabaseModule } from '@agape-care/database';

@Module({
  imports: [
    /* 환경 설정 */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
      expandVariables: true,
    }),

    /* DB 연결 */
    DatabaseModule,

    /* 로깅 */
    LoggerModule,

    /* 스케줄러 (필요 없으면 제거 가능) */
    ScheduleModule.forRoot(),

    /* API Rate Limit */
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL') || 60000,
          limit: config.get('THROTTLE_LIMIT') || 100,
        },
      ],
    }),
    AuthModule,
    HealthModule,
  ],

  controllers: [],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}

  async onModuleInit() {
    console.log('Agape-Care Auth API Starting...');
  }

  async onModuleDestroy() {
    console.log('Agape-Care API Shutting down...');
  }
}
