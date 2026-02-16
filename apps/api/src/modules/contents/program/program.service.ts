import { Prisma, PrismaService } from '@agape-care/database';
import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';

interface EnrichedSchedule {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  duration: number;
  instructor: string;
  location: string;
  participants: number;
  maxParticipants: number;
  recipientIds?: string[];
  description: string;
  status: '예정' | '진행중' | '완료' | '취소';
  color: string;
  createdAt: string;
  updatedAt: string;
  programId: string;
  scheduleId: string;
}

@Injectable()
export class ProgramService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    const count = await this.prisma.program.count();
    if (count > 0) {
      console.log('[INFO] Programs already exist, skipping seeding.');
      return;
    }

    console.log('[INFO] Seeding programs and schedules...');

    const programs = [
      {
        title: '뇌건강 체조',
        category: '인지활동',
        description: '치매 예방을 위한 뇌 건강 체조 프로그램',
        meta: { instructor: '김영희', color: '#3B82F6' },
        schedules: [
          { date: '2026-02-16', time: '10:00', location: '1층 강당' },
          { date: '2026-02-18', time: '10:00', location: '1층 강당' },
          { date: '2026-02-20', time: '10:00', location: '1층 강당' },
        ],
      },
      {
        title: '노래교실',
        category: '음악치료',
        description: '옛날 가요를 함께 부르며 즐기는 음악 시간',
        meta: { instructor: '박민수', color: '#8B5CF6' },
        schedules: [
          { date: '2026-02-17', time: '14:00', location: '2층 음악실' },
          { date: '2026-02-24', time: '14:00', location: '2층 음악실' },
        ],
      },
      {
        title: '물리치료',
        category: '물리치료',
        description: '개인별 맞춤 물리치료 프로그램',
        meta: { instructor: '이철수', color: '#F59E0B' },
        schedules: [
          { date: '2026-02-16', time: '11:00', location: '물리치료실' },
          { date: '2026-02-19', time: '11:00', location: '물리치료실' },
        ],
      },
      {
        title: '미술 작품 전시회',
        category: '특별행사',
        description: '수급자 분들의 미술 작품 전시회',
        meta: { instructor: '최순자', color: '#EF4444' },
        schedules: [{ date: '2026-02-28', time: '15:00', location: '전시실' }],
      },
      {
        title: '요리교실',
        category: '일상생활',
        description: '함께 맛있는 간식을 만들어보는 시간',
        meta: { instructor: '정미숙', color: '#10B981' },
        schedules: [{ date: '2026-02-23', time: '10:30', location: '주방 교육실' }],
      },
    ];

    for (const p of programs) {
      const program = await this.prisma.program.create({
        data: {
          title: p.title,
          category: p.category,
          description: p.description,
          meta: p.meta as any,
          isActive: true,
        },
      });

      for (const s of p.schedules) {
        const startsAt = new Date(`${s.date}T${s.time}:00`);
        const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);

        await this.prisma.programSchedule.create({
          data: {
            programId: program.id,
            startsAt,
            endsAt,
            location: s.location,
            status: 'PLANNED',
          },
        });
      }
    }

    console.log('[INFO] Seeding completed.');
  }

  /**
   * 프로그램 목록 조회
   */
  async findAllPrograms(query: any) {
    const { page = 1, limit = 20, search, isActive } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProgramWhereInput = {};

    if (search) {
      where.OR = [{ title: { contains: search } }, { description: { contains: search } }];
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [totalCount, items] = await Promise.all([
      this.prisma.program.count({ where }),
      this.prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: true,
        },
      }),
    ]);

    return {
      items: items.map(this.serializeProgram),
      totalCount,
      page,
      limit,
    };
  }

  /**
   * 프로그램 상세 조회
   */
  async findOneProgram(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id: BigInt(id) },
      include: {
        creator: true,
        schedules: true,
      },
    });

    if (!program) return null;

    return this.serializeProgram(program);
  }

  /**
   * 프로그램 생성
   */
  async createProgram(data: any) {
    const { title, description, category, isActive = true, meta = {}, createdBy } = data;

    try {
      const program = await this.prisma.program.create({
        data: {
          title,
          description,
          category,
          isActive,
          meta,
          createdBy: createdBy ? BigInt(createdBy) : null,
        },
        include: {
          creator: true,
        },
      });

      return this.serializeProgram(program);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Program already exists');
      }
      throw error;
    }
  }

  /**
   * 프로그램 수정
   */
  async updateProgram(id: string, data: any) {
    const program = await this.prisma.program.update({
      where: { id: BigInt(id) },
      data,
      include: {
        creator: true,
      },
    });

    return this.serializeProgram(program);
  }

  /**
   * 프로그램 삭제
   */
  async deleteProgram(id: string) {
    await this.prisma.program.delete({
      where: { id: BigInt(id) },
    });
  }

  /**
   * 일정 목록 조회 (기본)
   */
  async findAllSchedules(query: any): Promise<any> {
    try {
      console.log('DEBUG: findAllSchedules called');
      const test = await this.prisma.programSchedule.count();
      console.log('DEBUG: Count result:', test);
      const first = await this.prisma.programSchedule.findFirst();
      console.log('DEBUG: First result:', first);
      return { count: test, first };
    } catch (e) {
      console.error('DEBUG: findAllSchedules error:', e);
      throw e;
    }
  }

  /**
   * 일정 상세 조회 (캘린더용 - Program + Schedule 결합)
   */
  async findSchedulesWithDetails(query: any): Promise<any> {
    const { page = 1, limit = 100, startDate, endDate, category, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProgramScheduleWhereInput = {};

    // 날짜 범위 필터
    if (startDate || endDate) {
      where.startsAt = {};
      if (startDate) where.startsAt.gte = new Date(startDate);
      if (endDate) where.startsAt.lte = new Date(endDate);
    }

    // 상태 필터 (한글 -> 영어 변환)
    if (status) {
      where.status = this.mapKoreanStatusToDb(status);
    }

    // 카테고리 필터 (Program 테이블의 필드)
    if (category && category !== '전체') {
      where.program = { category };
    }

    try {
      const [totalCount, schedules] = await Promise.all([
        this.prisma.programSchedule.count({ where }),
        this.prisma.programSchedule.findMany({
          where,
          skip,
          take: limit,
          orderBy: { startsAt: 'asc' },
          select: {
            id: true,
            programId: true,
            startsAt: true,
            endsAt: true,
            location: true,
            // capacity: true, // Missing in DB
            // status: true,   // Missing in DB
            createdAt: true,
            updatedAt: true,
            program: true,
            // attendance: {
            //   where: { role: 'PARTICIPANT' },
            //   include: { resident: true },
            // },
          },
        }),
      ]);

      console.log('[DEBUG] ProgramService.findSchedulesWithDetails - where:', JSON.stringify(where), 'totalCount:', totalCount);

      if (totalCount === 0) {
        console.log('[DEBUG] No schedules found. Creating sample data...');
        try {
          let program = await this.prisma.program.findFirst();
          if (!program) {
            program = await this.prisma.program.create({
              data: {
                title: '기본 프로그램 (샘플)',
                description: '데이터가 없어서 자동 생성된 샘플입니다.',
                category: '건강',
                isActive: true,
              },
            });
          }

          const schedule = await this.prisma.programSchedule.create({
            data: {
              programId: program.id,
              startsAt: new Date(),
              endsAt: new Date(Date.now() + 3600000),
              location: '1층 로비',
              // status: 'PLANNED', // Skipped
              // capacity: 20       // Skipped
            },
          });

          // Re-fetch
          const newSchedules = await this.prisma.programSchedule.findMany({
            where,
            skip,
            take: limit,
            orderBy: { startsAt: 'asc' },
            select: {
              id: true,
              programId: true,
              startsAt: true,
              endsAt: true,
              location: true,
              createdAt: true,
              updatedAt: true,
              program: true,
            },
          });

          return {
            items: newSchedules.map(s => this.enrichScheduleWithProgram(s, s.program)),
            totalCount: newSchedules.length,
            page: Number(page),
            limit: Number(limit),
          };
        } catch (seedError) {
          console.error('[ERROR] Failed to seed sample data:', seedError);
          try {
            const fs = require('node:fs');
            fs.appendFileSync(
              'error.log',
              `[${new Date().toISOString()}] Error in seeding: ${JSON.stringify(seedError, Object.getOwnPropertyNames(seedError))}\n`,
            );
          } catch (e) {
            // ignore
          }
        }
      }

      return {
        items: schedules.map(s => this.enrichScheduleWithProgram(s, s.program)),
        totalCount,
        page: Number(page),
        limit: Number(limit),
      };
    } catch (error) {
      console.error('[ERROR] ProgramService.findSchedulesWithDetails failed:', error);
      try {
        const fs = require('node:fs');
        fs.appendFileSync(
          'error.log',
          `[${new Date().toISOString()}] Error in findSchedulesWithDetails: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}\n`,
        );
      } catch (e) {
        // ignore
      }
      throw error;
    }
  }

  /**
   * 일정 생성
   */
  async createSchedule(programId: string, data: any) {
    const { startTime, endTime, facilitatorId, location, notes } = data;

    const schedule = await this.prisma.programSchedule.create({
      data: {
        programId: BigInt(programId),
        startsAt: new Date(startTime),
        endsAt: endTime ? new Date(endTime) : new Date(new Date(startTime).getTime() + 60 * 60 * 1000),
        location,
        status: 'PLANNED',
      },
      include: {
        program: true,
      },
    });

    return this.serializeSchedule(schedule);
  }

  /**
   * 일정 수정
   */
  async updateSchedule(id: string, data: any) {
    const updateData: any = {};

    if (data.startTime) updateData.startsAt = new Date(data.startTime);
    if (data.endTime) updateData.endsAt = new Date(data.endTime);
    if (data.location !== undefined) updateData.location = data.location;
    if (data.capacity !== undefined) updateData.capacity = data.capacity;
    if (data.status) updateData.status = this.mapKoreanStatusToDb(data.status);

    const schedule = await this.prisma.programSchedule.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        program: true,
      },
    });

    return this.serializeSchedule(schedule);
  }

  /**
   * 일정 삭제
   */
  async deleteSchedule(id: string) {
    await this.prisma.programSchedule.delete({
      where: { id: BigInt(id) },
    });
  }

  /**
   * 출석 등록
   */
  async createAttendance(scheduleId: string, data: any) {
    const { residentId, employeeId, role = 'PARTICIPANT' } = data;

    const attendance = await this.prisma.programAttendance.create({
      data: {
        scheduleId: BigInt(scheduleId),
        residentId: residentId ? BigInt(residentId) : null,
        employeeId: employeeId ? BigInt(employeeId) : null,
        role,
        attended: false,
      },
      include: {
        resident: true,
        employee: true,
      },
    });

    return this.serializeAttendance(attendance);
  }

  /**
   * 출석 수정
   */
  async updateAttendance(id: string, data: any) {
    const attendance = await this.prisma.programAttendance.update({
      where: { id: BigInt(id) },
      data: {
        attended: data.attended,
        notes: data.notes,
      },
      include: {
        resident: true,
        employee: true,
      },
    });

    return this.serializeAttendance(attendance);
  }

  /**
   * 출석 체크
   */
  async checkAttendance(id: string, data: any) {
    const attendance = await this.prisma.programAttendance.update({
      where: { id: BigInt(id) },
      data: {
        attended: data.attended,
        checkedAt: data.attended ? new Date() : null,
      },
      include: {
        resident: true,
        employee: true,
      },
    });

    return this.serializeAttendance(attendance);
  }

  /**
   * 출석 삭제
   */
  async deleteAttendance(id: string) {
    await this.prisma.programAttendance.delete({
      where: { id: BigInt(id) },
    });
  }

  /**
   * Schedule과 Program 데이터를 결합하여 frontend가 원하는 형태로 변환
   */
  private enrichScheduleWithProgram(schedule: any, program: any): EnrichedSchedule {
    const meta = (program.meta as any) || {};
    const duration = schedule.endsAt ? Math.round((schedule.endsAt.getTime() - schedule.startsAt.getTime()) / (1000 * 60)) : 60; // 기본 60분

    const attendedCount = schedule.attendance?.filter((a: any) => a.attended).length || 0;
    const recipientIds =
      schedule.attendance?.filter((a: any) => a.role === 'PARTICIPANT' && a.residentId).map((a: any) => a.residentId.toString()) || [];

    return {
      id: schedule.id.toString(),
      title: program.title,
      category: program.category || '전체',
      date: schedule.startsAt.toISOString().split('T')[0],
      time: schedule.startsAt.toTimeString().substring(0, 5),
      duration,
      instructor: meta.instructor || '미지정',
      location: schedule.location || '',
      participants: attendedCount,
      maxParticipants: schedule.capacity || 0,
      recipientIds,
      description: program.description || '',
      status: this.mapStatusToKorean(schedule.status) as any,
      color: meta.color || '#3B82F6',
      createdAt: schedule.createdAt.toISOString(),
      updatedAt: schedule.updatedAt.toISOString(),
      programId: program.id.toString(),
      scheduleId: schedule.id.toString(),
    };
  }

  /**
   * 상태 코드 변환: DB -> 한글
   */
  private mapStatusToKorean(dbStatus: string): string {
    const map: Record<string, string> = {
      PLANNED: '예정',
      ONGOING: '진행중',
      COMPLETED: '완료',
      CANCELLED: '취소',
    };
    return map[dbStatus] || '예정';
  }

  /**
   * 상태 코드 변환: 한글 -> DB
   */
  private mapKoreanStatusToDb(koreanStatus: string): string {
    const map: Record<string, string> = {
      예정: 'PLANNED',
      진행중: 'ONGOING',
      완료: 'COMPLETED',
      취소: 'CANCELLED',
    };
    return map[koreanStatus] || 'PLANNED';
  }

  /**
   * Program 직렬화
   */
  private serializeProgram(program: any) {
    return {
      id: program.id.toString(),
      title: program.title,
      description: program.description,
      category: program.category,
      isActive: program.isActive,
      meta: program.meta,
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString(),
    };
  }

  /**
   * ProgramSchedule 직렬화
   */
  private serializeSchedule(schedule: any) {
    return {
      id: schedule.id.toString(),
      programId: schedule.programId.toString(),
      startTime: schedule.startsAt.toISOString(),
      endTime: schedule.endsAt ? schedule.endsAt.toISOString() : null,
      facilitatorId: null, // Field removed from DB but kept in schema for compatibility
      location: schedule.location,
      capacity: schedule.capacity,
      status: this.mapStatusToKorean(schedule.status),
      notes: null, // Field removed from DB but kept in schema for compatibility
      createdAt: schedule.createdAt.toISOString(),
      updatedAt: schedule.updatedAt.toISOString(),
      program: schedule.program ? this.serializeProgram(schedule.program) : undefined,
    };
  }

  /**
   * ProgramAttendance 직렬화
   */
  private serializeAttendance(attendance: any) {
    return {
      id: attendance.id.toString(),
      scheduleId: attendance.scheduleId.toString(),
      residentId: attendance.residentId ? attendance.residentId.toString() : null,
      employeeId: attendance.employeeId ? attendance.employeeId.toString() : null,
      role: attendance.role,
      attended: attendance.attended,
      checkedAt: attendance.checkedAt ? attendance.checkedAt.toISOString() : null,
      notes: attendance.notes,
      createdAt: attendance.createdAt.toISOString(),
    };
  }
}
