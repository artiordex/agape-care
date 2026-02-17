/**
 * Description : app.module.ts - 📌 Agape-Care Minimal Auth API
 * Author : Shiwoo Min
 * Date : 2026-01-26
 */

import { DatabaseModule } from '@agape-care/database';
import { AgapeCareLogger, LoggerModule } from '@agape-care/logger';
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AccountingModule } from './modules/accounting/accounting.module';
import { AuthModule } from './modules/auth/auth.module';
import { CareModule } from './modules/care/care.module';
import { FileModule } from './modules/common/file/file.module';
import { LoggerMiddleware } from './modules/common/middleware/logger.middleware';
import { BoardModule } from './modules/contents/board/board.module';
import { GalleryModule } from './modules/contents/gallery/gallery.module';
import { InquiryModule } from './modules/contents/inquiry/inquiry.module';
import { MealPlanModule } from './modules/contents/meal/meal-plan.module';
import { NoticeModule } from './modules/contents/notice/notice.module';
import { PopupBannerModule } from './modules/contents/popup/popup.module';
import { ProgramModule } from './modules/contents/program/program.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HealthModule } from './modules/health/health.module';
import { MyPageModule } from './modules/mypage/mypage.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ResidentModule } from './modules/resident/resident.module';
import { RoleModule } from './modules/role/role.module';
import { SettingsModule } from './modules/settings/settings.module';
import { NoticesModule } from './modules/web-view/notices/notices.module';
import { PopupModule } from './modules/web-view/popup/popup.module';

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

    /* 큐 (Redis) 설정 */
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST') || '127.0.0.1',
          port: config.get('REDIS_PORT') || 6379,
          password: config.get('REDIS_PASSWORD'),
        },
      }),
    }),

    AccountingModule,
    AuthModule,
    HealthModule,
    NotificationModule,
    ResidentModule,
    CareModule,
    DashboardModule,
    MyPageModule,
    SettingsModule,
    NoticesModule,
    PopupModule,
    RoleModule,
    NoticeModule,
    BoardModule,
    GalleryModule,
    InquiryModule,
    FileModule,
    MealPlanModule,
    PopupBannerModule,
    ProgramModule,
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
  constructor(private readonly logger: AgapeCareLogger) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
