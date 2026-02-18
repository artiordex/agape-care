/**
 * Description : route.ts - ?? route ?? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { logger } from '@agape-care/logger';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8000/api';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    // 백엔드 TransformInterceptor 응답: { data: { id, email, name, isAdmin, ... }, statusCode, timestamp }
    // AuthInitializer가 data?.success && data?.data 로 판단하므로 일관된 구조로 반환
    const userData = data?.data ?? data;
    return NextResponse.json({
      success: true,
      data: userData,
      accessToken: token,
    });
  } catch (error) {
    logger.error('[API/auth/me] 사용자 정보 조회 중 오류 발생', { category: 'AUTH', error });
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
