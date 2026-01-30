'use client';

import { api } from '@/lib/api';
import { useState } from 'react';

import CategoryFilter from './CategoryFilter';
import GalleryGrid from './GalleryGrid';
import GalleryModal from './GalleryModal';
import Pagination from './Pagination';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({
    open: false,
    images: [] as string[],
    title: '',
  });

  const itemsPerPage = 9;
  const categories = ['전체', '행사', '일상', '인지프로그램', '여가활동'];

  // API 호출
  const { data, isLoading } = api.content.getGalleryItems.useQuery(['content', 'gallery'], {
    query: {
      // category 필터가 API에 있다면 사용, 없으면 클라이언트 필터링
      // Contract에는 category query가 없음. 클라이언트 필터링.
    },
  });

  const itemsRaw = data?.status === 200 ? data.body.data : [];

  // 데이터 가공
  const items = itemsRaw.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category || '기타', // TODO: 카테고리 매핑 필요할 수 있음
    date: new Date(item.date).toLocaleDateString(),
    description: item.description || '',
    images: item.images || [],
  }));

  const filteredItems = selectedCategory === '전체' ? items : items.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleImageClick = (images: string[], title: string) => {
    setModal({
      open: true,
      images,
      title,
    });
  };

  const handleCloseModal = () => {
    setModal({
      open: false,
      images: [],
      title: '',
    });
  };

  if (isLoading) {
    return (
      <main className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">로딩 중...</div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 카테고리 필터 */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
          totalCount={filteredItems.length}
        />

        {/* 갤러리 그리드 */}
        <GalleryGrid items={currentItems} onClick={handleImageClick} />

        {/* 페이지네이션 */}
        <Pagination totalPages={totalPages} currentPage={currentPage} onChange={setCurrentPage} />
      </div>

      {/* 갤러리 모달 */}
      <GalleryModal open={modal.open} images={modal.images} title={modal.title} onClose={handleCloseModal} />
    </main>
  );
}
