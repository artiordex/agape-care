import { useEffect } from 'react';

interface Props {
  open: boolean;
  src: string;
  title: string;
  onClose: () => void;
}

export default function Lightbox({ open, src, title, onClose }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
        aria-label="닫기"
      >
        <i className="ri-close-line text-2xl" />
      </button>

      {/* ESC 안내 */}
      <div className="absolute left-4 top-4 z-10 hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm md:flex">
        <kbd className="rounded bg-white/20 px-2 py-1 text-xs font-semibold">ESC</kbd>
        <span>닫기</span>
      </div>

      <div className="relative w-full max-w-6xl" onClick={e => e.stopPropagation()}>
        {/* 이미지 */}
        <div className="relative overflow-hidden rounded-lg bg-black">
          <img
            src={src}
            alt={title}
            className="max-h-[80vh] w-full object-contain"
            onError={e => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
        </div>

        {/* 제목 */}
        {title && (
          <div className="mt-4 rounded-lg bg-white/10 px-6 py-4 text-center backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
