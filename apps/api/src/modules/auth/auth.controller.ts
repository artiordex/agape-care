/**
 * @description Auth 컨트롤러
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import type { LoginRequest } from '@agape-care/api-contract';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import type { CurrentUserDto } from './decorators/current-user.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/login
   * 로그인
   */
  @ApiOperation({ summary: '로그인', description: '이메일/비밀번호로 로그인하여 Access Token과 Refresh Token을 발급받습니다.' })
  @Post('login')
  async login(@Body() loginDto: LoginRequest) {
    return this.authService.login(loginDto);
  }

  /**
   * POST /auth/refresh
   * 토큰 갱신
   */
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '토큰 갱신', description: 'Refresh Token으로 새로운 Access Token을 발급받습니다.' })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@CurrentUser() user: CurrentUserDto) {
    return this.authService.refreshToken(user.sub);
  }

  /**
   * GET /auth/me
   * 내 정보 조회
   */
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '내 정보 조회', description: '현재 로그인된 사용자의 정보를 조회합니다.' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: CurrentUserDto) {
    return this.authService.getMe(user.sub);
  }

  /**
   * POST /auth/logout
   * 로그아웃
   */
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '로그아웃', description: '현재 세션을 종료합니다.' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return { message: '로그아웃되었습니다' };
  }
}
