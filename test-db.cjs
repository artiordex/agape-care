/**
 * Description : test-db.cjs - ?? test-db ?? ?? ??
 * Author: Shiwoo Min
 * Date: 2026-01-24
 */

require('dotenv').config();
const path = require('node:path');
module.paths.push(path.join(__dirname, 'packages/database/node_modules'));

const { PrismaClient } = require('./packages/database/src/generated/prisma');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

async function testDb() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('데이터베이스에 연결을 시도합니다...');
    await prisma.$connect();
    console.log('데이터베이스 연결에 성공했습니다.');

    console.log('테이블 목록을 조회합니다...');

    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    console.log('현재 public 스키마의 테이블 목록:');
    tables.forEach(t => {
      console.log('-', t.table_name);
    });
  } catch (err) {
    console.error('데이터베이스 테스트 중 오류가 발생했습니다:', err);
  } finally {
    await prisma.$disconnect();
    console.log('데이터베이스 연결을 종료했습니다.');
  }
}

testDb();
