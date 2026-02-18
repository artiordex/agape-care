/**
 * Description : PopupContainer.tsx - ?? ??? UI ????
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
  const [visiblePopups, setVisiblePopups] = useState<Popup[]>([]);

  // API에서 활성 팝업 가져오기
  const { data: popupsData, isLoading, error } = api.webPopup.getPopups.useQuery(['active-popups'], {});

  useEffect(() => {
    if (popupsData?.status !== 200) {
      return;
    }

    const popups = popupsData.body.data as Popup[];

    if (!popups || popups.length === 0) {
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
          return false;
        } else {
          localStorage.removeItem(`popup_hide_${popup.id}`);
        }
      }

      // "영구 숨김" 체크 (showOnce)
      const hideForever = localStorage.getItem(`popup_hide_forever_${popup.id}`);
      if (hideForever === 'true') {
        return false;
      }

      return true;
    });

    // 우선순위 정렬 (높은 순)
    const sorted = filtered.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    setVisiblePopups(sorted);
  }, [popupsData, isLoading, error]);

  const handleClosePopup = (id: string) => {
    setVisiblePopups(prev => prev.filter(popup => popup.id !== id));
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (visiblePopups.length === 0) {
    return null;
  }

  return (
    <>
      {visiblePopups.map((popup, index) => {
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
