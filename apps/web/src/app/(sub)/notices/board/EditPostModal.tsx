'use client';

import { useRef, useState } from 'react';

interface Post {
  id: string;
  title: string;
  writer_name: string;
  content: string;
  view_count: number;
  image_urls: string[];
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
}

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditPostModal({ post, onClose, onSuccess }: EditPostModalProps) {
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });
  const [existingImages, setExistingImages] = useState<string[]>(post.image_urls || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const totalImageCount = existingImages.length + newImages.length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (totalImageCount + files.length > 5) {
      setError('이미지는 최대 5개까지 업로드할 수 있습니다.');
      return;
    }

    const validFiles: File[] = [];
    const previewUrls: string[] = [];

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      validFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrls.push(reader.result as string);
        if (previewUrls.length === validFiles.length) {
          setNewImages(prev => [...prev, ...validFiles]);
          setNewImagePreviewUrls(prev => [...prev, ...previewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }

    if (!apiUrl) {
      setError('API URL이 설정되지 않았습니다.');
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('password', password);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);

      // 기존 이미지 URL들을 JSON 문자열로 전송
      formDataToSend.append('existing_images', JSON.stringify(existingImages));

      // 새로운 이미지 파일들 추가
      newImages.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await fetch(`${apiUrl}/board/posts/${post.id}`, {
        method: 'PUT',
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
      console.error('게시글 수정 실패:', err);
      setError('게시글 수정에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900">게시글 수정</h2>
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
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="게시글 작성 시 입력한 비밀번호"
            />
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
              {/* 기존 이미지 */}
              {existingImages.map((url, index) => (
                <div
                  key={`existing-${index}`}
                  className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-gray-200"
                >
                  <img src={url} alt={`Existing ${index + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(index)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <i className="ri-close-line text-sm" />
                  </button>
                </div>
              ))}

              {/* 새로 추가한 이미지 */}
              {newImagePreviewUrls.map((url, index) => (
                <div
                  key={`new-${index}`}
                  className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-amber-200"
                >
                  <img src={url} alt={`New ${index + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <i className="ri-close-line text-sm" />
                  </button>
                  <div className="absolute bottom-1 left-1 rounded bg-amber-500 px-1 py-0.5 text-xs text-white">
                    New
                  </div>
                </div>
              ))}

              {totalImageCount < 5 && (
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
              {submitting ? '수정 중...' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
