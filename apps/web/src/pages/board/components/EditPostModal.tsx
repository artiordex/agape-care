
import { useState, useRef } from 'react';

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

export default function EditPostModal({
  post,
  onClose,
  onSuccess,
}: EditPostModalProps) {
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });
  const [images, setImages] = useState<string[]>(post.image_urls || []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 5) {
      setError('이미지는 최대 5개까지 업로드할 수 있습니다.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          setError('이미지 크기는 5MB 이하여야 합니다.');
          continue;
        }

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}-${file.name}`;

        const response = await fetch(
          `${supabaseUrl}/storage/v1/object/free-board/${fileName}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: file,
          }
        );

        if (response.ok) {
          const publicUrl = `${supabaseUrl}/storage/v1/object/public/free-board/${fileName}`;
          uploadedUrls.push(publicUrl);
        } else {
          // If a specific file fails, capture its error but continue with others
          const errData = await response.json().catch(() => ({}));
          console.error(
            `이미지 업로드 실패 (${file.name}):`,
            errData
          );
          setError((prev) =>
            prev
              ? `${prev} ${file.name} 업로드에 실패했습니다.`
              : `${file.name} 업로드에 실패했습니다.`
          );
        }
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error('이미지 업로드 중 오류 발생:', err);
      setError('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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

    setSubmitting(true);

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/free-board-posts`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: post.id,
            password,
            title: formData.title,
            content: formData.content,
            imageUrls: images,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '게시글 수정에 실패했습니다.');
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">게시글 수정</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-gray-600"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="게시글 작성 시 입력한 비밀번호"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="제목을 입력하세요"
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[200px] resize-y"
              placeholder="내용을 입력하세요"
              maxLength={10000}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {formData.content.length} / 10,000
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              이미지 첨부 (최대 5개, 각 5MB 이하)
            </label>
            <div className="flex flex-wrap gap-4">
              {images.map((url, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200"
                >
                  <img
                    src={url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      <i className="ri-image-add-line text-3xl text-gray-400 mb-2"></i>
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
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {submitting ? '수정 중...' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
