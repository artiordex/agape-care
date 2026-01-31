'use client';

import clsx from 'clsx';

/**
 * 입소자 상세 정보 탭 구성 정의
 * 전문 행정 용어를 사용하여 가독성 향상
 */
const TABS = [
  { id: 'basic', label: '기본정보' },
  { id: 'care-plan', label: '이용계획서' },
  { id: 'assessment', label: '기초평가' },
  { id: 'consultation', label: '상담일지' },
  { id: 'extra-cost', label: '비급여/기타' },
  { id: 'copayment', label: '본인부담금' },
  { id: 'guardians', label: '보호자 관리' },
  { id: 'admission-history', label: '입퇴소 이력' },
  { id: 'documents', label: '서류 관리' },
  { id: 'medication', label: '투약 기록' },
  { id: 'care-summary', label: '케어 요약' },
];

interface Props {
  readonly activeTab: string;
  readonly onTabChange: (id: string) => void;
}

/**
 * [Component] 입소자 상세 섹션 전환 탭
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 고밀도 인터페이스
 */
export default function ResidentTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="border-b border-gray-300 bg-white font-sans antialiased">
      {/* 탭 리스트: 모바일/태블릿 대응 가로 스크롤 적용 */}
      <div className="scrollbar-hide flex overflow-x-auto px-6">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                'relative shrink-0 border-b-2 px-5 py-4 text-[13px] transition-all duration-200 active:scale-95',
                isActive
                  ? 'border-[#5C8D5A] font-black text-[#5C8D5A]' // 활성 상태: 아가페 그린 강조
                  : 'border-transparent font-bold text-gray-500 hover:border-gray-200 hover:text-gray-900',
              )}
            >
              {/* 탭 레이블 */}
              <span className="relative z-10">{tab.label}</span>

              {/* 활성 탭 하단 그라데이션 포인트 (디자인 디테일) */}
              {isActive && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#5C8D5A] to-transparent opacity-50"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
