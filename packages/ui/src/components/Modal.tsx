/**
 * Description : Modal.tsx - 📌 모달 다이얼로그 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from '../ui-types.js';

// 모달 컴포넌트 인터페이스
export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  children,
  className = '',
  ...props
}: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEsc, isOpen, onClose]);

  // 바디 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`shadow-modal relative w-full rounded-lg bg-white dark:bg-gray-800 ${sizeClasses[size]} animate-scale-in ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="border-border flex items-center justify-between border-b p-6">
            {title && (
              <h2 id="modal-title" className="text-text text-lg font-semibold">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text hover:bg-bg-soft rounded-md p-1 transition-colors"
                aria-label="닫기"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
