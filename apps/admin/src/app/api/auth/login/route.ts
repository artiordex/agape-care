import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8000/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        data?.message || data?.data?.message || '이메일 또는 비밀번호가 올바르지 않습니다.';
      return NextResponse.json({ success: false, message }, { status: res.status });
    }

    // 백엔드 TransformInterceptor 응답: { data: { accessToken, refreshToken, user }, statusCode, timestamp }
    const accessToken = data?.data?.accessToken;
    const loginData = data?.data; // { accessToken, refreshToken, user }

    const response = NextResponse.json({ success: true, data: loginData }, { status: 200 });

    if (accessToken) {
      response.cookies.set('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24시간
      });
    }

    return response;
  } catch (error) {
    console.error('[API/auth/login] Error:', error);
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
