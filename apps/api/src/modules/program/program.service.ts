import { CreateProgramRequest, UpdateProgramRequest } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProgramService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProgramDto: CreateProgramRequest, userId: string) {
    return this.prisma.program.create({
      data: {
        title: createProgramDto.title,
        description: createProgramDto.description,
        category: createProgramDto.category,
        isActive: createProgramDto.isActive ?? true,
        meta: createProgramDto.meta ?? {},
        createdBy: BigInt(userId),
      },
    });
  }

  async findAll(query: { search?: string; isActive?: boolean; page: number; limit: number }) {
    const { search, isActive, page, limit } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.program.count({ where }),
    ]);

    return {
      items: items.map(item => ({
        ...item,
        id: item.id.toString(),
        createdBy: item.createdBy?.toString(),
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
      totalCount,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id: BigInt(id) },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return {
      ...program,
      id: program.id.toString(),
      createdBy: program.createdBy?.toString(),
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString(),
    };
  }

  async update(id: string, updateProgramDto: UpdateProgramRequest) {
    const program = await this.prisma.program.findUnique({
      where: { id: BigInt(id) },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    const updated = await this.prisma.program.update({
      where: { id: BigInt(id) },
      data: {
        ...updateProgramDto,
      },
    });

    return {
      ...updated,
      id: updated.id.toString(),
      createdBy: updated.createdBy?.toString(),
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  }

  async remove(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id: BigInt(id) },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    await this.prisma.program.delete({
      where: { id: BigInt(id) },
    });

    return { message: 'Program deleted successfully' };
  }
}
