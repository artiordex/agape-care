/**
 * Description : auth.service.ts - 📌 인증 서비스 (로그인 / 토큰 / 사용자 정보)
 * Author : Shiwoo Min
 * Date : 2026-01-26
 */

import type { AuthUser, LoginRequest, LoginResponse } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
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
  ) {}

  /**
   * 로그인 처리
   */
  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const employee = await this.prisma.employee.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!employee || !employee.passwordHash) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    if (employee.status !== 'ACTIVE') {
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
    const id = BigInt(userId);

    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee || employee.status !== 'ACTIVE') {
      throw new UnauthorizedException('유효하지 않은 사용자입니다');
    }

    return this.generateTokens(userId, employee.email!);
  }

  /**
   * 현재 사용자 정보 조회
   */
  async getMe(userId: string) {
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
