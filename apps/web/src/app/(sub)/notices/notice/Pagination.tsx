/**
 * Description : Pagination.tsx - ?? Pagination UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NoticePagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  // 최대 5개 페이지 버튼만 표시
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const firstPage = pageNumbers[0] ?? 0;
  const lastPage = pageNumbers.at(-1) ?? totalPages;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'
        }`}
      >
        <i className="ri-arrow-left-s-line" />
      </button>

      {/* 첫 페이지 */}
      {firstPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 bg-white text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            1
          </button>
          {firstPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {/* 페이지 번호들 */}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-10 w-10 items-center justify-center rounded text-sm font-semibold transition-colors ${
            currentPage === page
              ? 'border border-[#5C8D5A] bg-[#5C8D5A] text-white'
              : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* 마지막 페이지 */}
      {lastPage < totalPages && (
        <>
          {lastPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 bg-white text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors ${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'
        }`}
      >
        <i className="ri-arrow-right-s-line" />
      </button>
    </div>
  );
}
