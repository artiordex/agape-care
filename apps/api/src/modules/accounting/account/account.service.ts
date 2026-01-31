import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async getAccounts() {
    const accounts = await this.prisma.account.findMany({
      include: { category: true },
    });
    return accounts.map(this.serializeAccount);
  }

  private serializeAccount(account: Prisma.AccountGetPayload<{ include: { category: true } }>) {
    return {
      ...account,
      id: account.id.toString(),
      categoryId: account.categoryId?.toString() || null,
    };
  }
}
