import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from './generated/prisma/index.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    console.log('[PrismaService] Constructor called');

    const connectionString = process.env.DATABASE_URL || 'postgresql://agape:agape@127.0.0.1:5432/agape_care';
    console.log('[PrismaService] Connection string:', connectionString);

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });

    this.pool = pool;
    console.log('[PrismaService] Constructor completed');
  }

  async onModuleInit(): Promise<void> {
    console.log('[PrismaService] onModuleInit called');
    await this.$connect();
    console.log('[Database] Prisma 7 connected with pg adapter');
  }

  async onModuleDestroy(): Promise<void> {
    console.log('[PrismaService] onModuleDestroy called');
    await this.$disconnect();
    await this.pool.end();
    console.log('[Database] Prisma disconnected');
  }
}
