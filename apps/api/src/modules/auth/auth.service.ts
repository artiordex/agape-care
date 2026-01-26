import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { prisma } from '@agape-care/database';
import * as bcrypt from 'bcrypt';
import type { LoginRequest, LoginResponse, AuthUser } from '@agape-care/api-contract';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const employee = await prisma.employee.findUnique({
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

    await prisma.employee.update({
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

  async refreshToken(userId: string): Promise<{ accessToken: string; refreshToken: string }> {
    const employee = await prisma.employee.findUnique({
      where: { id: BigInt(userId) },
    });

    if (!employee || employee.status !== 'ACTIVE') {
      throw new UnauthorizedException('유효하지 않은 사용자입니다');
    }

    return this.generateTokens(userId, employee.email!);
  }

  async getMe(userId: string) {
    const employee = await prisma.employee.findUnique({
      where: { id: BigInt(userId) },
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

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    return { accessToken, refreshToken };
  }

  async validateUser(userId: string) {
    const employee = await prisma.employee.findUnique({
      where: { id: BigInt(userId) },
    });

    if (!employee || employee.status !== 'ACTIVE') {
      return null;
    }

    return {
      id: employee.id.toString(),
      email: employee.email,
      name: employee.name,
      isAdmin: employee.isAdmin,
    };
  }
}
