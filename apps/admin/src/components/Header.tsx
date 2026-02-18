/**
 * Description : Header.tsx - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import menuData from '@/data/menu.json';
import { usePathname } from 'next/navigation';

/**
 * AdminHeaderProps 인터페이스
 * @property onLogout - 로그아웃 버튼 클릭 시 실행될 콜백 함수
 * @property onToggleSidebar - 모바일 환경에서 사이드바를 열고 닫는 콜백 함수
 */
interface AdminHeaderProps {
  readonly onLogout: () => void;
  readonly onToggleSidebar: () => void;
}

/**
 * MenuItem 인터페이스
 * 메뉴 데이터 구조를 정의하며, 재귀적인 트리 구조(children)를 지원함
 */
interface MenuItem {
  id: string;
  name: string;
  path?: string;
  children?: MenuItem[];
}

/**
 * [유틸리티 함수] flattenMenus
 * 트리 구조의 메뉴 데이터를 1차원 배열로 평탄화합니다.
 * 목적: 현재 브라우저의 URL(pathname)과 일치하는 메뉴 객체를 쉽게 찾기 위함 (find 메서드 활용)
 */
function flattenMenus(menus: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  const walk = (items: MenuItem[]) => {
    items.forEach(item => {
      result.push(item);
      if (item.children) walk(item.children); // 자식 노드가 있으면 재귀 호출
    });
  };
  walk(menus);
  return result;
}

/**
 * [Main Component] AdminHeader
 * 아가페케어 통합 관리 시스템의 상단 헤더 영역입니다.
 * * 특징:
 * 1. 실시간 경로 추적: usePathname을 통해 현재 페이지 제목을 동적으로 표시
 * 2. ERP 관제 스타일: 보안 상태(SSL), 권한 등 고밀도 정보 디자인 적용
 * 3. 반응형 설계: 모바일 전용 토글 버튼 및 데스크톱 전용 상태 배지 구분
 */
export default function AdminHeader({ onLogout, onToggleSidebar }: AdminHeaderProps) {
  // Next.js의 hook을 사용하여 현재 브라우저의 경로 추출
  const pathname = usePathname();

  // JSON 데이터를 MenuItem 배열 타입으로 단언한 뒤 평탄화 수행
  const flatMenus = flattenMenus(menuData.menus as MenuItem[]);

  // 현재 URL과 path가 일치하는 메뉴 아이템 검색
  const currentMenu = flatMenus.find(m => m.path === pathname);
  const title = currentMenu?.name ?? '대시보드';

  return (
    // 헤더 컨테이너: 상단 고정(sticky), 높이 16(64px), 테두리 및 배경색 설정
    <header className="sticky top-0 z-50 h-16 border-b border-gray-300 bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* [좌측 영역] 시스템 메뉴 컨트롤 및 현재 위치 표시 */}
        <div className="flex items-center gap-5">
          {/* [모바일 사이드바 토글]
            - 화면 크기가 md(768px) 이상일 때는 숨김 (hidden md:hidden)
            - 클릭 시 부모로부터 받은 onToggleSidebar 실행
          */}
          <button
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-500 transition-all hover:bg-gray-50 hover:text-[#5C8D5A] md:hidden"
            aria-label="메뉴 토글"
          >
            <i className="ri-menu-2-line text-xl" />
          </button>

          {/* 현재 위치 인디케이터 */}
          <div className="flex items-center gap-3">
            {/* 시각적 강조를 위한 컬러 바와 미세한 그림자 효과 */}
            <div className="h-5 w-1.5 rounded-full bg-[#5C8D5A] shadow-sm shadow-emerald-100"></div>
            <div>
              {/* 현재 메뉴명 (대문자 강조 및 볼드 처리) */}
              <h1 className="text-base font-bold uppercase leading-none tracking-tight text-gray-900">{title}</h1>
              {/* 서브 텍스트 */}
              <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-400">Agape-Care Administration System</p>
            </div>
          </div>
        </div>

        {/* [우측 영역] 보안 정보 및 사용자 세션 제어 */}
        <div className="flex items-center gap-6">
          {/* 시스템 상태 섹션 */}
          <div className="hidden items-center gap-2 border-r border-gray-200 pr-6 sm:flex">
            {/* SSL 보안 상태 배지 */}
            <div className="flex items-center gap-2 rounded-sm border border-emerald-100 bg-emerald-50 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[12px] font-black uppercase tracking-tight text-emerald-700">SSL 보안 연결</span>
            </div>

            {/* 관리자 권한 배지 */}
            <div className="flex items-center gap-2 rounded-sm border border-emerald-100 bg-white px-3 py-1.5 shadow-sm">
              <i className="ri-shield-check-fill text-[12px] text-[#5C8D5A]"></i>
              <span className="text-[12px] font-black uppercase tracking-tight text-[#5C8D5A]">최고 관리자 권한</span>
            </div>
          </div>

          {/* 세션 관리 섹션 */}
          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="group flex items-center gap-2 text-[12px] font-black text-gray-400 transition-all hover:text-red-500"
            >
              {/* 아이콘 컨테이너 */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 shadow-sm transition-all group-hover:border-red-100 group-hover:bg-red-50">
                <i className="ri-logout-box-r-line text-[12px]" />
              </div>
              {/* 모바일에서는 텍스트를 숨기고 아이콘만 노출 */}
              <span className="hidden tracking-tighter sm:inline">세션 종료 (Logout)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
