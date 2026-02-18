/**
 * Description : auth.service.ts - ?? auth ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-01-26
 */

import type { AuthUser, LoginRequest, LoginResponse } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { AgapeCareLogger } from '@agape-care/logger';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: AgapeCareLogger,
  ) {}

  /**
   * 로그인 처리
   */
  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginDto;
    this.logger.info('로그인 시도', { category: 'AUTH', metadata: { email } });

    const employee = await this.prisma.employee.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!employee || !employee.passwordHash) {
      this.logger.warn('로그인 실패 - 사용자 없음', { category: 'AUTH', metadata: { email } });
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.passwordHash);
    if (!isPasswordValid) {
      this.logger.warn('로그인 실패 - 비밀번호 불일치', { category: 'AUTH', metadata: { email } });
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    if (employee.status !== 'ACTIVE') {
      this.logger.warn('로그인 실패 - 비활성 계정', { category: 'AUTH', metadata: { email, status: employee.status } });
      throw new UnauthorizedException('비활성화된 계정입니다');
    }

    // 마지막 로그인 타임스탬프 업데이트
    await this.prisma.employee.update({
      where: { id: employee.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(employee.id.toString(), employee.email!);

    const user: AuthUser = {
      id: employee.id.toString(),
      email: employee.email!,
      name: employee.name,
      isAdmin: employee.isAdmin,
      departmentId: employee.departmentId?.toString() || null,
      roleId: employee.roleId?.toString() || null,
      status: employee.status as 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE',
    };

    this.logger.info('로그인 성공', { category: 'AUTH', metadata: { userId: employee.id.toString(), email } });
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user,
    };
  }

  /**
   * 리프레시 토큰 → 새로운 AccessToken 발급
   */
  async refreshToken(userId: string) {
    this.logger.info('토큰 갱신 요청', { category: 'AUTH', metadata: { userId } });
    const id = BigInt(userId);

    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee || employee.status !== 'ACTIVE') {
      this.logger.warn('토큰 갱신 실패 - 유효하지 않은 사용자', { category: 'AUTH', metadata: { userId } });
      throw new UnauthorizedException('유효하지 않은 사용자입니다');
    }

    return this.generateTokens(userId, employee.email!);
  }

  /**
   * 현재 사용자 정보 조회
   */
  async getMe(userId: string) {
    this.logger.info('사용자 정보 조회', { category: 'AUTH', metadata: { userId } });
    const id = BigInt(userId);

    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        departmentId: true,
        roleId: true,
        status: true,
      },
    });

    if (!employee) {
      this.logger.warn('사용자 정보 조회 실패 - 사용자 없음', { category: 'AUTH', metadata: { userId } });
      throw new UnauthorizedException('사용자를 찾을 수 없습니다');
    }

    return {
      id: employee.id.toString(),
      email: employee.email!,
      name: employee.name,
      isAdmin: employee.isAdmin,
      departmentId: employee.departmentId?.toString() || null,
      roleId: employee.roleId?.toString() || null,
      status: employee.status,
    };
  }

  /**
   * JWT 액세스/리프레시 토큰 생성
   */
  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload as any, {
      secret: this.configService.get<string>('JWT_SECRET')!,
      // 타입스크립트가 StringValue를 요구해서 any로 살짝 눌러줌
      expiresIn: this.configService.get('JWT_EXPIRES_IN') as any,
    });

    const refreshToken = this.jwtService.sign(payload as any, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') as any,
    });

    return { accessToken, refreshToken };
  }

  /**
   * JWT Strategy에서 사용되는 유저 검증
   */
  async validateUser(userId: string) {
    this.logger.debug('JWT 사용자 검증', { category: 'AUTH', metadata: { userId } });
    const id = BigInt(userId);

    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee || employee.status !== 'ACTIVE') {
      return null;
    }

    return {
      sub: employee.id.toString(), // CurrentUserDto.sub 필드 (getMe, refresh에서 사용)
      id: employee.id.toString(),
      email: employee.email,
      name: employee.name,
      isAdmin: employee.isAdmin,
    };
  }
}
