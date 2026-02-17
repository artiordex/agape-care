import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login';

  // 토큰 없이 보호된 페이지 접근 → 로그인으로
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 이미 로그인된 상태에서 로그인 페이지 접근 → 대시보드로
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // api routes, static files, images 등은 제외
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
