import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from './generated/prisma/index.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://agape:agape@127.0.0.1:5432/agape_care';

    const pool = new Pool({
      connectionString,
      // Connection Pool 설정
      max: 20, // 최대 연결 수
      idleTimeoutMillis: 30000, // 유휴 연결 타임아웃 (30초)
      connectionTimeoutMillis: 2000, // 연결 타임아웃 (2초)
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
    });

    this.pool = pool;

    // Prisma 쿼리 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      this.$on('query' as never, (e: any) => {
        this.logger.debug(`Query: ${e.query}`);
        this.logger.debug(`Duration: ${e.duration}ms`);
      });
    }
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('Database connected successfully (Prisma 7 + pg adapter)');

      // 연결 테스트
      const result = await this.$queryRaw<Array<{ now: Date }>>`SELECT NOW() as now`;
      const dbTime = result?.[0]?.now;
      if (dbTime) {
        this.logger.log(`Database time: ${dbTime}`);
      }
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      await this.pool.end();
      this.logger.log('Database disconnected');
    } catch (error) {
      this.logger.error('Error during database disconnect', error);
    }
  }

  /**
   * 트랜잭션 헬퍼 메서드
   */
  async executeTransaction<T>(fn: (prisma: PrismaService) => Promise<T>): Promise<T> {
    return this.$transaction(async tx => {
      return fn(tx as PrismaService);
    });
  }

  /**
   * Health check 메서드
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
