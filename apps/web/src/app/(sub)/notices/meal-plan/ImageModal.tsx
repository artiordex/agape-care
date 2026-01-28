interface Props {
  imageUrl: string | null;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: Props) {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
      >
        <i className="ri-close-line text-2xl text-white" />
      </button>
      <img
        src={imageUrl}
        alt="급식 사진 확대"
        className="max-h-full max-w-full rounded-lg object-contain"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}
