'use client';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NoticePagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="border-t border-gray-200 bg-white px-6 py-6">
      <div className="flex items-center justify-center gap-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${currentPage <= 1 ? 'opacity-40' : 'hover:bg-gray-50'}`}
        >
          <i className="ri-arrow-left-s-line text-gray-600" />
        </button>

        {/* Pages */}
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium transition ${
              currentPage === page ? 'bg-[#5C8D5A] text-white' : 'border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${currentPage >= totalPages ? 'opacity-40' : 'hover:bg-gray-50'}`}
        >
          <i className="ri-arrow-right-s-line text-gray-600" />
        </button>
      </div>
    </div>
  );
}
