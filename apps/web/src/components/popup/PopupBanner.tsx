/**
 * Description : PopupBanner.tsx - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface PopupBannerProps {
  readonly id: string;
  readonly title: string;
  readonly content?: string | null;
  readonly imageUrl?: string | null;
  readonly linkUrl?: string | null;
  readonly displayType: 'POPUP' | 'BANNER' | 'MODAL';
  readonly position?: string | null;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly showOnce: boolean;
  readonly onClose: () => void;
  readonly index?: number; // 여러 팝업이 겹치지 않도록 인덱스 추가
}

export default function PopupBanner({
  id,
  title,
  content,
  imageUrl,
  linkUrl,
  displayType,
  position = 'center',
  width = 400,
  height = 500,
  showOnce,
  onClose,
  index = 0,
}: PopupBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [dontShowToday, setDontShowToday] = useState(false);

  // 팝업 위치 계산 (인덱스에 따라 오프셋 적용)
  const getPositionStyles = () => {
    const positions: Record<string, string> = {
      center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'top-left': `top-10 left-10`,
      'top-right': `top-10 right-10`,
      'bottom-left': `bottom-10 left-10`,
      'bottom-right': `bottom-10 right-10`,
    };

    // bottom-right일 때는 우측에서 왼쪽으로 나란히 배치
    if (position === 'bottom-right' && index > 0) {
      const rightOffset = 10 + index * (Number(width) + 20); // 팝업 너비 + 간격
      return `bottom-10 right-[${rightOffset}px]`;
    }

    return positions[position || 'center'] || positions.center;
  };

  const handleClose = () => {
    setIsVisible(false);

    // "오늘 하루 보지 않기" 처리
    if (dontShowToday) {
      const hideUntil = new Date();
      hideUntil.setHours(23, 59, 59, 999);
      localStorage.setItem(`popup_hide_${id}`, hideUntil.toISOString());
    }

    // showOnce가 true면 영구적으로 숨김
    if (showOnce) {
      localStorage.setItem(`popup_hide_forever_${id}`, 'true');
    }

    setTimeout(onClose, 300);
  };

  const handleLinkClick = () => {
    if (linkUrl) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // MODAL 타입 (배경 오버레이 없이 좌측 상단에 표시)
  if (displayType === 'MODAL') {
    // 인덱스에 따른 동적 위치 계산
    const getModalStyle = (): React.CSSProperties => {
      const leftOffset = 10 + index * ((width || 400) + 20); // 팝업 너비 + 20px 간격
      return {
        width: width || 400,
        maxHeight: height || 500,
        position: 'fixed',
        top: '100px', // 헤더 밑
        left: `${leftOffset}px`,
      };
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-[9999]"
            style={getModalStyle()}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* 닫기 버튼 */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40"
                aria-label="팝업 닫기"
              >
                <i className="ri-close-line text-xl" />
              </button>

              {/* 이미지 */}
              {imageUrl && (
                <div
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer overflow-hidden"
                  onClick={handleLinkClick}
                  onKeyDown={e => e.key === 'Enter' && handleLinkClick()}
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{ maxHeight: (height || 500) - 100 }}
                  />
                </div>
              )}

              {/* 텍스트 콘텐츠 */}
              {!imageUrl && (
                <div className="p-8">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">{title}</h3>
                  {content && (
                    <div
                      className="prose prose-sm max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}
                </div>
              )}

              {/* 하단 버튼 영역 */}
              <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={dontShowToday}
                    onChange={e => setDontShowToday(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                  />
                  <span>오늘 하루 보지 않기</span>
                </label>
                <button
                  onClick={handleClose}
                  className="rounded-lg bg-[#5C8D5A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4A7548]"
                >
                  닫기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // POPUP 타입 (좌측 상단에 나란히 표시)
  if (displayType === 'POPUP') {
    // 인덱스에 따른 동적 위치 계산
    const getPopupStyle = (): React.CSSProperties => {
      const leftOffset = 10 + index * ((width || 400) + 20); // 팝업 너비 + 20px 간격
      return {
        width: width || 400,
        position: 'fixed',
        top: '100px', // 헤더 밑
        left: `${leftOffset}px`,
      };
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed z-[9999]"
            style={getPopupStyle()}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* 닫기 버튼 */}
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40"
                aria-label="팝업 닫기"
              >
                <i className="ri-close-line text-lg" />
              </button>

              {/* 이미지 */}
              {imageUrl && (
                <div
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer overflow-hidden"
                  onClick={handleLinkClick}
                  onKeyDown={e => e.key === 'Enter' && handleLinkClick()}
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{ maxHeight: height || 500 }}
                  />
                </div>
              )}

              {/* 텍스트 콘텐츠 */}
              {!imageUrl && (
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
                  {content && (
                    <div
                      className="prose prose-sm max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}
                </div>
              )}

              {/* 하단 버튼 */}
              <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={dontShowToday}
                    onChange={e => setDontShowToday(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                  />
                  <span>오늘 하루 보지 않기</span>
                </label>
                <button
                  onClick={handleClose}
                  className="rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-300"
                >
                  닫기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // BANNER 타입
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed left-0 right-0 top-0 z-[9999] bg-gradient-to-r from-[#5C8D5A] to-[#4A7548] shadow-lg"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex flex-1 items-center gap-4">
              <i className="ri-notification-3-line text-2xl text-white" />
              <div>
                <h4 className="font-bold text-white">{title}</h4>
                {content && <p className="text-sm text-white/90">{content}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {linkUrl && (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  자세히 보기
                </a>
              )}
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                aria-label="배너 닫기"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
