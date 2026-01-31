import { CreateHealthNoteRequest, GetHealthNotesQuery, UpdateHealthNoteRequest } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealthNotes(residentId: string, query: GetHealthNotesQuery) {
    const { page, limit, noteType, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      residentId: BigInt(residentId),
    };

    if (noteType) {
      where.noteType = noteType;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const [healthNotes, total] = await Promise.all([
      this.prisma.residentHealthNote.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          recorder: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.residentHealthNote.count({ where }),
    ]);

    return {
      data: healthNotes.map(this.serializeHealthNote),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async createHealthNote(
    residentId: string,
    // TODO: userId can be passed here to link to the recorder (Employee) if we have the user context
    data: CreateHealthNoteRequest,
  ) {
    const healthNote = await this.prisma.residentHealthNote.create({
      data: {
        residentId: BigInt(residentId),
        ...data,
      },
      include: {
        recorder: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.serializeHealthNote(healthNote);
  }

  async updateHealthNote(noteId: string, data: UpdateHealthNoteRequest) {
    const healthNote = await this.prisma.residentHealthNote.findUnique({
      where: { id: BigInt(noteId) },
    });

    if (!healthNote) {
      throw new NotFoundException(`Health Note with ID ${noteId} not found`);
    }

    const updatedHealthNote = await this.prisma.residentHealthNote.update({
      where: { id: BigInt(noteId) },
      data,
      include: {
        recorder: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.serializeHealthNote(updatedHealthNote);
  }

  async deleteHealthNote(noteId: string) {
    const healthNote = await this.prisma.residentHealthNote.findUnique({
      where: { id: BigInt(noteId) },
    });

    if (!healthNote) {
      throw new NotFoundException(`Health Note with ID ${noteId} not found`);
    }

    await this.prisma.residentHealthNote.delete({
      where: { id: BigInt(noteId) },
    });

    return { message: 'Health Note deleted successfully' };
  }

  private serializeHealthNote(note: any) {
    return {
      ...note,
      id: note.id.toString(),
      residentId: note.residentId.toString(),
      recordedBy: note.recordedBy ? note.recordedBy.toString() : null,
      recordedByName: note.recorder?.name || null,
      createdAt: note.createdAt.toISOString(),
    };
  }
}
