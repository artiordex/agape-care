'use client';

import { useRef, useState } from 'react';

interface WritePostModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function WritePostModal({ onClose, onSuccess }: WritePostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    writerName: '',
    password: '',
    content: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 5) {
      setError('이미지는 최대 5개까지 업로드할 수 있습니다.');
      return;
    }

    const newImages: File[] = [];
    const newPreviewUrls: string[] = [];

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      newImages.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result as string);
        if (newPreviewUrls.length === newImages.length) {
          setImages(prev => [...prev, ...newImages]);
          setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.writerName.trim() || !formData.password || !formData.content.trim()) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    if (!apiUrl) {
      setError('API URL이 설정되지 않았습니다.');
      return;
    }

    setSubmitting(true);

    try {
      // FormData로 파일과 데이터 함께 전송
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('writer_name', formData.writerName);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('content', formData.content);

      images.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      const response = await fetch(`${apiUrl}/board/posts`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      onSuccess();
    } catch (err) {
      console.error('게시글 작성 실패:', err);
      setError('게시글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900">글쓰기</h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <i className="ri-close-line text-2xl text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              작성자 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.writerName}
              onChange={e => setFormData({ ...formData, writerName: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="작성자 이름을 입력하세요"
              maxLength={50}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="수정/삭제 시 필요한 비밀번호 (4자 이상)"
              minLength={4}
            />
            <p className="mt-1 text-xs text-gray-500">* 비밀번호를 잊으면 글을 수정/삭제할 수 없습니다.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="제목을 입력하세요"
              maxLength={200}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="min-h-[200px] w-full resize-y rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="내용을 입력하세요"
              maxLength={10000}
            />
            <p className="mt-1 text-right text-xs text-gray-500">{formData.content.length} / 10,000</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              이미지 첨부 (최대 5개, 각 5MB 이하)
            </label>
            <div className="flex flex-wrap gap-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-gray-200">
                  <img src={url} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <i className="ri-close-line text-sm" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex h-32 w-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-amber-500 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? (
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
                  ) : (
                    <>
                      <i className="ri-image-add-line mb-2 text-3xl text-gray-400" />
                      <span className="text-sm text-gray-500">이미지 추가</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 whitespace-nowrap rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex-1 whitespace-nowrap rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
