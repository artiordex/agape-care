/**
 * Description : app.module.ts - 📌 Agape-Care 요양원 ERP NestJS 루트 모듈
 * Author : Shiwoo Min
 * Date : 2026-01-25
 */

import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

// 내부 패키지들
import { PrismaService } from '@agape-care/database';
import { LoggerService } from '@agape-care/logger';

// 서버 전용 공통 레이어 (apps/api/src/common)
import { AuthGuard, AuthMiddleware, HttpExceptionFilter, LoggerMiddleware, ResponseInterceptor, RolesGuard } from './common';

// 도메인 모듈들
import {
  // 회계 & 급여
  AccountingModule,
  AttendanceModule,
  AuditLogsModule,
  // 인증 & 권한
  AuthModule,
  BoardModule,
  CareModule,
  CarePlansModule,
  CareTasksModule,
  CctvModule,
  ConsultationModule,
  // 조직 & 직원
  DepartmentsModule,
  EmployeeEducationsModule,
  EmployeeRolesModule,
  EmployeesModule,
  FacilityInspectionsModule,
  // 파일 & 설정
  FileStorageModule,
  GalleryModule,
  GrievancesModule,
  IncidentsModule,
  InsuranceClaimsModule,

  // 운영 관리
  InventoryModule,
  InvoicesModule,
  LeaveModule,
  MealPlansModule,
  // 마이페이지
  MyPageModule,
  // 공지 & 콘텐츠
  NoticesModule,
  // 알림 & SMS
  NotificationModule,
  PayrollModule,
  PopupBannersModule,
  ProgramSchedulesModule,
  // 프로그램 & 식단
  ProgramsModule,
  ResidentHealthModule,
  ResidentMedicationsModule,
  // 입소자 & 케어
  ResidentsModule,
  ResidentVitalsModule,
  ShiftModule,
  SmsModule,
  SystemSettingsModule,
  TransactionsModule,
  TransportModule,
  VehiclesModule,
  WebsiteSettingsModule,
} from './modules';

@Module({
  imports: [
    /**
     * 환경설정 모듈 (최우선 로드)
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
      expandVariables: true,
    }),

    /**
     * 스케줄러 모듈 (크론잡, 배치 작업)
     */
    ScheduleModule.forRoot(),

    /**
     * Rate Limiting (API 호출 제한)
     */
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL') || 60000, // 60초
          limit: config.get('THROTTLE_LIMIT') || 100, // 100 요청
        },
      ],
    }),

    /**
     * BullMQ 큐 모듈 (백그라운드 작업)
     */
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST') || '127.0.0.1',
          port: config.get('REDIS_PORT') || 6379,
          password: config.get('REDIS_PASSWORD'),
          username: config.get('REDIS_USERNAME'),
          db: config.get('REDIS_DB') || 0,
          maxRetriesPerRequest: null,
        },
      }),
    }),

    /**
     * Job Queue 등록
     */
    BullModule.registerQueue(
      { name: 'notification' }, // 알림 발송
      { name: 'sms' }, // SMS 발송
      { name: 'email' }, // 이메일 발송
      { name: 'insurance-claim' }, // 보험 청구 처리
      { name: 'payroll' }, // 급여 계산
      { name: 'report' }, // 보고서 생성
      { name: 'backup' }, // 백업 작업
      { name: 'analytics' }, // 통계 분석
    ),

    // 인증 & 권한 모듈
    AuthModule,

    // 조직 & 직원 관리 모듈
    DepartmentsModule,
    EmployeesModule,
    EmployeeRolesModule,
    EmployeeEducationsModule,
    AttendanceModule,
    ShiftModule,
    LeaveModule,

    // 입소자 & 케어 관리 모듈
    ResidentsModule,
    ResidentHealthModule,
    ResidentMedicationsModule,
    ResidentVitalsModule,
    CareModule,
    CarePlansModule,
    CareTasksModule,
    ConsultationModule,
    IncidentsModule,

    // 프로그램 & 식단 모듈
    ProgramsModule,
    ProgramSchedulesModule,
    MealPlansModule,

    // 회계 & 급여 모듈
    AccountingModule,
    TransactionsModule,
    PayrollModule,
    InvoicesModule,
    InsuranceClaimsModule,

    // 운영 관리 모듈
    InventoryModule,
    VehiclesModule,
    TransportModule,
    CctvModule,
    GrievancesModule,
    FacilityInspectionsModule,

    // 공지 & 콘텐츠 모듈
    NoticesModule,
    BoardModule,
    GalleryModule,
    PopupBannersModule,
    WebsiteSettingsModule,

    // 알림 & SMS 모듈
    NotificationModule,
    SmsModule,

    // 파일 & 시스템 설정 모듈
    FileStorageModule,
    SystemSettingsModule,
    AuditLogsModule,

    // 마이페이지 모듈
    MyPageModule,
  ],

  controllers: [],

  providers: [
    // Prisma 데이터베이스 서비스
    PrismaService,

    // 로거 서비스
    LoggerService,

    // 전역 가드 (Rate Limiting)
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    // 전역 가드 (인증)
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    // 전역 가드 (역할 기반 권한)
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

    // 전역 인터셉터 (응답 포맷)
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    // 전역 예외 필터
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  /**
   * @description 전역 미들웨어 등록
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AuthMiddleware, // 인증 미들웨어
        LoggerMiddleware, // 로깅 미들웨어
      )
      .forRoutes('*');
  }

  /**
   * @description 애플리케이션 시작 시 실행
   */
  async onModuleInit() {
    console.log('Agape-Care ERP API Server Starting...');
    console.log('Current Date:', new Date().toISOString());
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Database:', process.env.DATABASE_URL ? 'Connected' : 'Not configured');
    console.log('Redis:', process.env.REDIS_HOST ? 'Connected' : 'Optional');
  }

  /**
   * @description 애플리케이션 종료 시 실행
   */
  async onModuleDestroy() {
    console.log('👋 Agape-Care ERP API Server Shutting down...');
  }
}
