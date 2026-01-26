/**
 * @description Auth 컨트롤러
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import type { LoginRequest } from '@agape-care/api-contract';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CurrentUserDto } from './decorators/current-user.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/login
   * 로그인
   */
  @Post('login')
  async login(@Body() loginDto: LoginRequest) {
    return this.authService.login(loginDto);
  }

  /**
   * POST /auth/refresh
   * 토큰 갱신
   */
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@CurrentUser() user: CurrentUserDto) {
    return this.authService.refreshToken(user.sub);
  }

  /**
   * GET /auth/me
   * 내 정보 조회
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: CurrentUserDto) {
    return this.authService.getMe(user.sub);
  }

  /**
   * POST /auth/logout
   * 로그아웃
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return { message: '로그아웃되었습니다' };
  }
}
