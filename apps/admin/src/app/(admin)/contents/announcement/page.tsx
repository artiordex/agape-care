'use client';

import { useEffect, useMemo, useState } from 'react';
import AnnouncementDetailModal from './AnnouncementDetailModal';
import AnnouncementFilter from './AnnouncementFilter';
import AnnouncementFormModal from './AnnouncementFormModal';
import AnnouncementHeader from './AnnouncementHeader';
import AnnouncementTable from './AnnouncementTable';
import { Announcement } from './announcement.type';

/**
 * [Page] 아가페 공지사항 통합 관리 시스템
 * image_102a40.png의 검색 및 테이블 디자인 통합 반영
 * 완전한 CRUD 기능 포함
 */
export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Announcement | null>(null);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);

  // 1. 초기 데이터 로드 및 샘플 주입
  useEffect(() => {
    const saved = localStorage.getItem('agape_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      const initial: Announcement[] = [
        {
          id: '3',
          category: '일반',
          title: '2026년 1분기 종사자 교육 일정 안내',
          author: '관리자',
          createdAt: '2026.01.20',
          views: 124,
          content:
            '금번 1분기 종사자 대상 정기 교육이 다음과 같이 시행됩니다.\n\n[교육 일정]\n- 일시: 2026년 2월 15일 (토) 14:00~17:00\n- 장소: 시설 내 대강당\n- 대상: 전 직원\n\n[교육 내용]\n1. 노인학대 예방 및 신고 의무\n2. 응급처치 및 심폐소생술 실습\n3. 감염병 예방 관리\n4. 직장 내 괴롭힘 방지\n\n필수 교육이오니 전 직원 참석 바랍니다.',
          isPinned: true,
          attachments: [
            { name: '2026_1분기_교육일정표.pdf', url: '#' },
            { name: '교육_사전자료.pdf', url: '#' },
          ],
        },
        {
          id: '2',
          category: '긴급',
          title: '시설 내 방역 지침 강화 공지 (필독)',
          author: '시설장',
          createdAt: '2026.01.18',
          views: 256,
          content:
            '최근 감염병 확산에 따라 시설 내 방역 지침이 다음과 같이 강화됩니다.\n\n[주요 변경사항]\n1. 출입 시 체온 측정 의무화\n2. 마스크 착용 필수 (KF80 이상)\n3. 방문객 면회 사전예약제 시행\n4. 공용구역 소독 횟수 증가 (1일 3회 → 5회)\n\n[시행일자]\n2026년 1월 20일부터 즉시 시행\n\n전 직원 협조 부탁드립니다.',
          isPinned: false,
          attachments: [],
        },
        {
          id: '1',
          category: '행사',
          title: '구정 맞이 어르신 문화 행사 안내',
          author: '복지팀',
          createdAt: '2026.01.15',
          views: 89,
          content:
            '설날을 맞이하여 어르신들을 위한 특별 문화행사를 개최합니다.\n\n[행사 개요]\n- 일시: 2026년 1월 28일 (수) 오전 10시\n- 장소: 시설 내 대강당\n- 내용: 전통 공연, 떡국 나눔, 세배 행사\n\n많은 참여 부탁드립니다.',
          isPinned: false,
          attachments: [],
        },
      ];
      setAnnouncements(initial);
      localStorage.setItem('agape_announcements', JSON.stringify(initial));
    }
  }, []);

  // 2. 실시간 필터링 엔진
  const filteredData = useMemo(() => {
    return announcements
      .filter(item => {
        const matchSearch =
          item.title.includes(searchTerm) || item.content.includes(searchTerm) || item.author.includes(searchTerm);
        const matchCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchSearch && matchCategory;
      })
      .sort((a, b) => {
        // 고정 공지사항 우선
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        // 날짜 최신순
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [announcements, searchTerm, filterCategory]);

  // 3. 조회수 증가
  const incrementViews = (id: string) => {
    const updated = announcements.map(item => (item.id === id ? { ...item, views: item.views + 1 } : item));
    setAnnouncements(updated);
    localStorage.setItem('agape_announcements', JSON.stringify(updated));
  };

  // 4. 신규 등록
  const handleAdd = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  // 5. 상세 조회
  const handleView = (item: Announcement) => {
    incrementViews(item.id);
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  // 6. 수정
  const handleEdit = (item: Announcement) => {
    setEditingItem(item);
    setIsDetailModalOpen(false);
    setIsFormModalOpen(true);
  };

  // 7. 삭제
  const handleDelete = (id: string) => {
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;

    const updated = announcements.filter(item => item.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('agape_announcements', JSON.stringify(updated));
    setIsDetailModalOpen(false);
    alert('✅ 공지사항이 삭제되었습니다.');
  };

  // 8. 저장 (신규/수정)
  const handleSave = (data: Partial<Announcement>) => {
    let updated: Announcement[];

    if (editingItem) {
      // 수정
      updated = announcements.map(item => (item.id === editingItem.id ? { ...item, ...data } : item));
      alert('✅ 공지사항이 수정되었습니다.');
    } else {
      // 신규
      const maxId = Math.max(0, ...announcements.map(a => parseInt(a.id))) + 1;
      const newEntry: Announcement = {
        ...data,
        id: maxId.toString(),
        createdAt: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
        views: 0,
        attachments: data.attachments || [],
      } as Announcement;
      updated = [newEntry, ...announcements];
      alert('✅ 새로운 공지사항이 등록되었습니다.');
    }

    setAnnouncements(updated);
    localStorage.setItem('agape_announcements', JSON.stringify(updated));
    setIsFormModalOpen(false);
    setEditingItem(null);
  };

  // 9. 고정 토글
  const handleTogglePin = (id: string) => {
    const updated = announcements.map(item => (item.id === id ? { ...item, isPinned: !item.isPinned } : item));
    setAnnouncements(updated);
    localStorage.setItem('agape_announcements', JSON.stringify(updated));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* A. 상단 액션 헤더 */}
      <AnnouncementHeader onAdd={handleAdd} totalCount={announcements.length} />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-full space-y-8">
          {/* B. 검색 필터 섹션 */}
          <AnnouncementFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />

          {/* C. 통계 요약 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              label="전체 공지"
              value={announcements.length}
              icon="ri-notification-line"
              color="text-gray-800"
            />
            <StatCard
              label="고정 공지"
              value={announcements.filter(a => a.isPinned).length}
              icon="ri-pushpin-2-fill"
              color="text-[#5C8D5A]"
            />
            <StatCard
              label="금일 등록"
              value={
                announcements.filter(
                  a => a.createdAt === new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
                ).length
              }
              icon="ri-calendar-check-line"
              color="text-blue-600"
            />
            <StatCard
              label="총 조회수"
              value={announcements.reduce((sum, a) => sum + a.views, 0)}
              icon="ri-eye-line"
              color="text-purple-600"
            />
          </div>

          {/* D. 공지사항 데이터 그리드 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
                <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">전체 공지사항 목록</h2>
                <span className="text-[11px] font-bold text-gray-400">(검색결과: {filteredData.length}건)</span>
              </div>
            </div>

            <AnnouncementTable
              announcements={filteredData}
              onSelect={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePin={handleTogglePin}
            />
          </div>
        </div>
      </div>

      {/* E. 작성/수정 폼 모달 */}
      <AnnouncementFormModal
        isOpen={isFormModalOpen}
        announcement={editingItem}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
      />

      {/* F. 상세보기 모달 */}
      <AnnouncementDetailModal
        isOpen={isDetailModalOpen}
        announcement={selectedItem}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedItem(null);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5c8d5a;
        }
      `}</style>
    </div>
  );
}

// 통계 카드 컴포넌트
function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#5C8D5A]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</span>
        <i className={`${icon} text-[14px] ${color}`}></i>
      </div>
      <div className="mt-2 font-mono text-2xl font-black tracking-tighter text-gray-800">{value.toLocaleString()}</div>
    </div>
  );
}
