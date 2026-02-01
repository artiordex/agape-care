/**
 * Description : page.tsx - 📌 갤러리 메인 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useState } from 'react';

import galleryData from '@/data/gallery.json';
import GalleryFilter from './GalleryFilter';
import GalleryHeader from './GalleryHeader';
import GalleryModal from './GalleryModal';
import Pagination from './Pagination';
import GalleryAllTab from './tabs/GalleryAllTab';
import GalleryGridTab from './tabs/GalleryGridTab';
import GalleryMonthTab from './tabs/GalleryMonthTab';
import GalleryWeekTab from './tabs/GalleryWeekTab';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  images: string[];
}

export default function GalleryPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'all' | 'grid'>('all');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({
    open: false,
    images: [] as string[],
    title: '',
    category: '',
    date: '',
    description: '',
  });

  const itemsPerPage = 15;
  const categories = ['전체', '행사', '일상', '인지프로그램', '여가활동'];

  // 갤러리 데이터
  const allItems: GalleryItem[] = galleryData.galleries.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category,
    date: item.date,
    description: item.description,
    images: item.images,
  }));

  // 날짜 네비게이션 핸들러
  const handlePrev = () => {
    if (viewMode === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else if (viewMode === 'month') {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (viewMode === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else if (viewMode === 'month') {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      setCurrentDate(newDate);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // 주간 데이터 가공
  const getWeekData = () => {
    const targetDate = new Date(currentDate);
    const currentDay = targetDate.getDay();

    // 이번 주 월요일 구하기
    const monday = new Date(targetDate);
    monday.setDate(targetDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    const weekData = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().split('T')[0]!;

      // 해당 날짜의 아이템들
      const items = allItems.filter(item => {
        const itemMatch = item.date === dateStr;
        const categoryMatch = selectedCategory === '전체' || item.category === selectedCategory;
        const searchMatch =
          searchQuery === '' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());

        return itemMatch && categoryMatch && searchMatch;
      });

      weekData.push({ date: dateStr, items });
    }

    return weekData;
  };

  // 월간 데이터 가공
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();

    const monthData = [];

    // 앞쪽 빈칸
    for (let i = 0; i < startDay; i++) {
      monthData.push({ date: null, items: [] });
    }

    // 실제 날짜들
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const dateStr = date.toISOString().split('T')[0]!;

      // 해당 날짜의 아이템들
      const items = allItems.filter(item => {
        const itemMatch = item.date === dateStr;
        const categoryMatch = selectedCategory === '전체' || item.category === selectedCategory;
        const searchMatch =
          searchQuery === '' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());

        return itemMatch && categoryMatch && searchMatch;
      });

      monthData.push({ date: dateStr, items });
    }

    return monthData;
  };

  // 전체 보기 데이터 필터링
  const getFilteredItems = () => {
    return allItems.filter(item => {
      const categoryMatch = selectedCategory === '전체' || item.category === selectedCategory;
      const searchMatch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  };

  const filteredItems = getFilteredItems();
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // 검색 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // 뷰 모드 변경 핸들러
  const handleViewModeChange = (mode: 'week' | 'month' | 'all' | 'grid') => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  // 모달 열기
  const handleItemClick = (images: string[], title: string, category: string, date: string, description: string) => {
    setModal({
      open: true,
      images,
      title,
      category,
      date,
      description,
    });
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModal({
      open: false,
      images: [],
      title: '',
      category: '',
      date: '',
      description: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <GalleryHeader
          currentDate={currentDate}
          viewMode={viewMode}
          searchQuery={searchQuery}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          onViewModeChange={handleViewModeChange}
          onSearchChange={handleSearchChange}
        />

        {/* 카테고리 필터 */}
        <GalleryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
          totalCount={filteredItems.length}
        />

        {/* 뷰 모드별 렌더링 */}
        {viewMode === 'week' && <GalleryWeekTab weekData={getWeekData()} onItemClick={handleItemClick} />}

        {viewMode === 'month' && <GalleryMonthTab monthData={getMonthData()} onItemClick={handleItemClick} />}

        {viewMode === 'all' && <GalleryAllTab items={currentItems} onItemClick={handleItemClick} />}

        {viewMode === 'grid' && <GalleryGridTab items={filteredItems} onItemClick={handleItemClick} />}

        {/* 페이지네이션 (전체 보기일 때만) */}
        {viewMode === 'all' && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onChange={setCurrentPage} />
        )}
      </div>

      {/* 갤러리 모달 */}
      <GalleryModal
        open={modal.open}
        images={modal.images}
        title={modal.title}
        category={modal.category}
        date={modal.date}
        description={modal.description}
        onClose={handleCloseModal}
      />
    </div>
  );
}
