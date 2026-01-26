
/**
 * @description Prisma Client Export
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
});

export default prisma;

export * from '@prisma/client';

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
