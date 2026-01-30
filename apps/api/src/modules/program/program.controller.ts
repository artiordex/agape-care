import { CreateProgramRequest, GetProgramsQuery, UpdateProgramRequest } from '@agape-care/api-contract';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProgramService } from './program.service';

@ApiTags('Program')
@Controller('programs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @ApiOperation({ summary: '프로그램 생성' })
  @ApiResponse({ status: 201, description: 'Created' })
  async create(@Body() createProgramDto: any, @CurrentUser('id') userId: string) {
    // Validation using Zod pipe or manual validation would go here.
    // Ideally we use a global Pipe, but casting for now to match implementation pattern
    return this.programService.create(createProgramDto as CreateProgramRequest, userId);
  }

  @Get()
  @ApiOperation({ summary: '프로그램 목록 조회' })
  async findAll(@Query() query: any) {
    const params = query as GetProgramsQuery;
    return this.programService.findAll({
      search: params.search,
      isActive: params.isActive === undefined ? undefined : String(params.isActive) === 'true',
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 20,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '프로그램 상세 조회' })
  async findOne(@Param('id') id: string) {
    return this.programService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '프로그램 수정' })
  async update(@Param('id') id: string, @Body() updateProgramDto: any) {
    return this.programService.update(id, updateProgramDto as UpdateProgramRequest);
  }

  @Delete(':id')
  @ApiOperation({ summary: '프로그램 삭제' })
  async remove(@Param('id') id: string) {
    return this.programService.remove(id);
  }
}
