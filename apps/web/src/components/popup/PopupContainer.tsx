/**
 * Description : PopupContainer.tsx - 📌 팝업 컨테이너 (API 연동 및 관리)
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

'use client';

import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import PopupBanner from './PopupBanner';

interface Popup {
  id: string;
  title: string;
  content?: string | null;
  imageUrl?: string | null;
  linkUrl?: string | null;
  displayType: 'POPUP' | 'BANNER' | 'MODAL';
  position?: string | null;
  width?: number | null;
  height?: number | null;
  startDate: Date | string;
  endDate: Date | string;
  isActive: boolean;
  showOnce: boolean;
  priority: number;
}

export default function PopupContainer() {
  console.log('[PopupContainer] 컴포넌트 렌더링 시작');

  const [visiblePopups, setVisiblePopups] = useState<Popup[]>([]);

  // API에서 활성 팝업 가져오기
  const { data: popupsData, isLoading, error } = api.webPopup.getPopups.useQuery(['active-popups'], {});

  console.log('[PopupContainer] useQuery 결과 - isLoading:', isLoading, 'error:', error, 'data:', popupsData);

  useEffect(() => {
    console.log('[PopupContainer] API 응답:', popupsData);
    console.log('[PopupContainer] 로딩 상태:', isLoading);
    console.log('[PopupContainer] 에러:', error);

    if (popupsData?.status !== 200) {
      console.log('[PopupContainer] API 응답이 200이 아님:', popupsData?.status);
      return;
    }

    const popups = popupsData.body.data as Popup[];
    console.log('[PopupContainer] 가져온 팝업 데이터:', popups);
    console.log('[PopupContainer] 팝업 개수:', popups.length);

    if (!popups || popups.length === 0) {
      console.log('[PopupContainer] 팝업 데이터가 없습니다');
      return;
    }

    // 필터링: 로컬스토리지에서 숨김 처리된 팝업 제외
    const now = new Date();
    const filtered = popups.filter(popup => {
      // "오늘 하루 보지 않기" 체크
      const hideUntilStr = localStorage.getItem(`popup_hide_${popup.id}`);
      if (hideUntilStr) {
        const hideUntil = new Date(hideUntilStr);
        if (now < hideUntil) {
          console.log(`[PopupContainer] 팝업 ${popup.id} 숨김 (${hideUntil}까지)`);
          return false;
        } else {
          localStorage.removeItem(`popup_hide_${popup.id}`);
        }
      }

      // "영구 숨김" 체크 (showOnce)
      const hideForever = localStorage.getItem(`popup_hide_forever_${popup.id}`);
      if (hideForever === 'true') {
        console.log(`[PopupContainer] 팝업 ${popup.id} 영구 숨김`);
        return false;
      }

      return true;
    });

    console.log('[PopupContainer] 필터링 후 팝업:', filtered);
    console.log('[PopupContainer] 필터링 후 개수:', filtered.length);

    // 우선순위 정렬 (높은 순)
    const sorted = filtered.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    setVisiblePopups(sorted);
  }, [popupsData, isLoading, error]);

  const handleClosePopup = (id: string) => {
    console.log('[PopupContainer] 팝업 닫기:', id);
    setVisiblePopups(prev => prev.filter(popup => popup.id !== id));
  };

  console.log('[PopupContainer] 렌더링 - 표시할 팝업 개수:', visiblePopups.length);

  if (isLoading) {
    console.log('[PopupContainer] 로딩 중...');
    return null;
  }

  if (error) {
    console.error('[PopupContainer] 에러 발생:', error);
    return null;
  }

  if (visiblePopups.length === 0) {
    console.log('[PopupContainer] 표시할 팝업이 없습니다');
    return null;
  }

  console.log('[PopupContainer] 팝업 렌더링 시작');

  return (
    <>
      {visiblePopups.map((popup, index) => {
        console.log('[PopupContainer] 팝업 렌더링:', popup.id, popup.title);

        return (
          <PopupBanner
            key={popup.id}
            id={popup.id}
            title={popup.title}
            content={popup.content}
            imageUrl={popup.imageUrl}
            linkUrl={popup.linkUrl}
            displayType={popup.displayType}
            position={popup.position}
            width={popup.width}
            height={popup.height}
            showOnce={popup.showOnce}
            onClose={() => handleClosePopup(popup.id)}
            index={index}
          />
        );
      })}
    </>
  );
}
