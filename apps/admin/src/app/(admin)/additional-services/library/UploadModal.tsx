/**
 * Description : UploadModal.tsx - ?? UploadModal UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { api } from '@/lib/api';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSuccess: () => void;
}

export default function UploadModal({ isOpen, onClose, onSuccess }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = api.file.uploadFiles.useMutation({
    onSuccess: () => {
      toast.success('파일이 성공적으로 업로드되었습니다.');
      setFiles([]);
      onSuccess();
      onClose();
    },
    onError: error => {
      console.error(error);
      toast.error('파일 업로드 중 오류가 발생했습니다.');
    },
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    mutate({
      body: formData,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm duration-200">
      <div className="animate-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">새 자료 업로드</h2>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          <section
            aria-label="File upload dropzone"
            className={clsx(
              'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all',
              dragActive ? 'border-[#5C8D5A] bg-[#5C8D5A]/5' : 'border-gray-200 bg-gray-50',
              files.length > 0 ? 'h-32' : 'h-64',
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input ref={inputRef} type="file" multiple className="hidden" onChange={handleChange} />

            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#5C8D5A]/10 text-[#5C8D5A]">
              <i className="ri-upload-cloud-2-line text-2xl"></i>
            </div>

            <p className="text-sm font-bold text-gray-700">
              <button onClick={() => inputRef.current?.click()} className="mr-1 text-[#5C8D5A] hover:underline">
                클릭하여 선택
              </button>{' '}
              또는 파일을 여기로 드래그하세요
            </p>
            <p className="mt-1 text-xs text-gray-400">최대 50MB, 모든 파일 형식 지원</p>
          </section>

          {files.length > 0 && (
            <div className="custom-scrollbar mt-4 max-h-48 overflow-y-auto pr-1">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                선택된 파일 ({files.length})
              </p>
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div
                    key={`${file.name}-${file.lastModified}-${idx}`}
                    className="animate-in fade-in slide-in-from-bottom-2 flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-sm duration-200"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500">
                        <i className="ri-file-line"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="ml-2 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={files.length === 0 || isPending}
            className={clsx(
              'flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-bold text-white shadow-md transition-all active:scale-95',
              files.length === 0 || isPending ? 'cursor-not-allowed bg-gray-300' : 'bg-[#5C8D5A] hover:bg-[#4A7548]',
            )}
          >
            {isPending ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i> 업로드 중...
              </>
            ) : (
              <>
                <i className="ri-upload-2-fill"></i> 업로드 시작
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
