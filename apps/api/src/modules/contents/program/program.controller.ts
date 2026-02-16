import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { programContract } from '@agape-care/api-contract';
import { ProgramService } from './program.service';

@Controller()
@ApiTags('Contents - Program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @TsRestHandler(programContract.getPrograms)
  async getPrograms() {
    return tsRestHandler(programContract.getPrograms, async ({ query }) => {
      const result = await this.programService.findAllPrograms(query);
      return { status: 200, body: result };
    });
  }

  @TsRestHandler(programContract.getProgram)
  async getProgram() {
    return tsRestHandler(programContract.getProgram, async ({ params }) => {
      const program = await this.programService.findOneProgram(params.id);
      if (!program) {
        return {
          status: 404,
          body: {
            message: 'Program not found',
            statusCode: 404,
          },
        };
      }
      return { status: 200, body: program };
    });
  }

  @TsRestHandler(programContract.createProgram)
  async createProgram() {
    return tsRestHandler(programContract.createProgram, async ({ body }) => {
      try {
        const program = await this.programService.createProgram(body);
        return { status: 201, body: program };
      } catch (error: any) {
        if (error.status === 409) {
          return {
            status: 409,
            body: {
              message: error.message,
              statusCode: 409,
            },
          };
        }
        return {
          status: 400,
          body: {
            message: error.message || 'Failed to create program',
            statusCode: 400,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.updateProgram)
  async updateProgram() {
    return tsRestHandler(programContract.updateProgram, async ({ params, body }) => {
      try {
        const program = await this.programService.updateProgram(params.id, body);
        return { status: 200, body: program };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            message: 'Program not found',
            statusCode: 404,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.deleteProgram)
  async deleteProgram() {
    return tsRestHandler(programContract.deleteProgram, async ({ params }) => {
      try {
        await this.programService.deleteProgram(params.id);
        return {
          status: 200,
          body: {
            message: 'Program deleted successfully',
          },
        };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            message: 'Program not found',
            statusCode: 404,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.getSchedules)
  async getSchedules() {
    return tsRestHandler(programContract.getSchedules, async ({ query }) => {
      const result = await this.programService.findAllSchedules(query);
      return { status: 200, body: result };
    });
  }

  @TsRestHandler(programContract.getSchedulesEnriched)
  async getSchedulesEnriched() {
    return tsRestHandler(programContract.getSchedulesEnriched, async ({ query }) => {
      const result = await this.programService.findSchedulesWithDetails(query);
      return { status: 200, body: result };
    });
  }

  @TsRestHandler(programContract.createSchedule)
  async createSchedule() {
    return tsRestHandler(programContract.createSchedule, async ({ params, body }) => {
      try {
        const schedule = await this.programService.createSchedule(params.programId, body);
        return { status: 201, body: schedule };
      } catch (error: any) {
        return {
          status: 400,
          body: {
            message: error.message || 'Failed to create schedule',
            statusCode: 400,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.updateSchedule)
  async updateSchedule() {
    return tsRestHandler(programContract.updateSchedule, async ({ params, body }) => {
      try {
        const schedule = await this.programService.updateSchedule(params.id, body);
        return { status: 200, body: schedule };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            message: 'Schedule not found',
            statusCode: 404,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.deleteSchedule)
  async deleteSchedule() {
    return tsRestHandler(programContract.deleteSchedule, async ({ params }) => {
      try {
        await this.programService.deleteSchedule(params.id);
        return {
          status: 200,
          body: {
            message: 'Schedule deleted successfully',
          },
        };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            message: 'Schedule not found',
            statusCode: 404,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.createAttendance)
  async createAttendance() {
    return tsRestHandler(programContract.createAttendance, async ({ params, body }) => {
      try {
        const attendance = await this.programService.createAttendance(params.scheduleId, body);
        return { status: 201, body: attendance };
      } catch (error: any) {
        return {
          status: 400,
          body: {
            message: error.message || 'Failed to create attendance',
            statusCode: 400,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.updateAttendance)
  async updateAttendance() {
    return tsRestHandler(programContract.updateAttendance, async ({ params, body }) => {
      try {
        const attendance = await this.programService.updateAttendance(params.id, body);
        return { status: 200, body: attendance };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            message: 'Attendance not found',
            statusCode: 404,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.checkAttendance)
  async checkAttendance() {
    return tsRestHandler(programContract.checkAttendance, async ({ params, body }) => {
      try {
        const attendance = await this.programService.checkAttendance(params.id, body);
        return { status: 200, body: attendance };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            message: 'Attendance not found',
            statusCode: 404,
          },
        };
      }
    });
  }

  @TsRestHandler(programContract.deleteAttendance)
  async deleteAttendance() {
    return tsRestHandler(programContract.deleteAttendance, async ({ params }) => {
      try {
        await this.programService.deleteAttendance(params.id);
        return {
          status: 200,
          body: {
            message: 'Attendance deleted successfully',
          },
        };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            message: 'Attendance not found',
            statusCode: 404,
          },
        };
      }
    });
  }
}
