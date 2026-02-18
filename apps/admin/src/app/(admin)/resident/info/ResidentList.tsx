/**
 * Description : ResidentList.tsx - ?? ResidentList UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface Props {
  readonly residents: any[];
  readonly selectedResident: any;
  readonly searchTerm: string;
  readonly filterStatus: string;
  readonly filterClassification: string;
  readonly filterRoom: string;
  readonly onSelectResident: (resident: any) => void;
  readonly onSearchChange: (term: string) => void;
  readonly onFilterChange: (status: string) => void;
  readonly onFilterClassificationChange: (classification: string) => void;
  readonly onFilterRoomChange: (room: string) => void;
  readonly getStatusColor: (status: string) => string;
  readonly getGradeColor: (grade: string) => string;
  readonly onAddResident?: () => void;
}

interface RoomMaster {
  id: string;
  floor: string;
  roomName: string;
  capacity: number;
  currentCount: number;
}

export default function ResidentList({
  residents,
  selectedResident,
  searchTerm,
  filterStatus,
  filterClassification,
  filterRoom,
  onSelectResident,
  onSearchChange,
  onFilterChange,
  onFilterClassificationChange,
  onFilterRoomChange,
  getStatusColor,
  getGradeColor,
  onAddResident,
}: Props) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showClassificationDropdown, setShowClassificationDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);

  const [rooms, setRooms] = useState<RoomMaster[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const classificationDropdownRef = useRef<HTMLDivElement>(null);
  const roomDropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = ['전체', '입소중', '외출중', '외박중', '퇴소', '대기중'];
  const classificationOptions = [
    '전체',
    '일반 (20%)',
    '감경 (12%)',
    '감경 (10%)',
    '감경 (8%)',
    '기초 (0%)',
    '의료 (10%)',
    '의료 (8%)',
    '등급외',
  ];

  // 생활실 데이터 Fetch
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/residents/rooms/list');
        if (res.ok) {
          const data: RoomMaster[] = await res.json();
          setRooms(data);
          // 층 정보가 있다면 첫 번째 층을 기본 선택
          const uniqueFloors = Array.from(new Set(data.map(r => r.floor))).sort((a, b) => a.localeCompare(b));
          if (uniqueFloors.length > 0) {
            setSelectedFloor(uniqueFloors[0]!);
          }
        }
      } catch (error) {
        console.error('Failed to fetch rooms', error);
      }
    };
    fetchRooms();
  }, []);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (classificationDropdownRef.current && !classificationDropdownRef.current.contains(event.target as Node)) {
        setShowClassificationDropdown(false);
      }
      if (roomDropdownRef.current && !roomDropdownRef.current.contains(event.target as Node)) {
        setShowRoomDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 통계 계산
  const stats = {
    total: residents.length,
    male: residents.filter(r => r.gender === '남').length,
    female: residents.filter(r => r.gender === '여').length,
  };

  const handleStatusSelect = (status: string) => {
    onFilterChange(status);
    setShowStatusDropdown(false);
  };

  const handleClassificationSelect = (classification: string) => {
    onFilterClassificationChange(classification);
  };

  const handleRoomSelect = (roomName: string) => {
    onFilterRoomChange(roomName);
    setShowRoomDropdown(false);
  };

  const floors = Array.from(new Set(rooms.map(r => r.floor))).sort((a, b) => a.localeCompare(b));
  const currentFloorRooms = rooms.filter(r => r.floor === selectedFloor);

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-300 bg-white p-4 antialiased">
      {/* 상단 제어 탭 영역 */}
      <div className="mb-2 flex flex-wrap gap-1">
        {/* 현황선택 - 드롭다운 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
          >
            현황선택
          </button>

          {showStatusDropdown && (
            <div className="absolute left-0 top-full z-30 mt-1 w-32 rounded-sm border border-gray-400 bg-white p-2 shadow-xl">
              <div className="flex flex-col gap-1.5">
                {statusOptions.map(option => {
                  const isSelected = filterStatus === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleStatusSelect(option)}
                      className={clsx(
                        'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] font-bold shadow-sm transition-all',
                        isSelected
                          ? 'bg-[#E67E22] text-white ring-1 ring-[#D35400]' /* Selected: Orange */
                          : 'bg-gray-400 text-white hover:bg-gray-500' /* Unselected: Grey */,
                      )}
                    >
                      {/* Checkbox Icon UI */}
                      <div
                        className={clsx(
                          'flex h-4 w-4 items-center justify-center rounded-[2px] border',
                          isSelected ? 'border-white bg-[#D35400]' : 'border-gray-200 bg-white',
                        )}
                      >
                        {isSelected && <i className="ri-check-line text-[10px] text-white"></i>}
                      </div>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex justify-center border-t border-gray-200 pt-2">
                <button
                  onClick={() => setShowStatusDropdown(false)}
                  className="rounded bg-gray-600 px-4 py-1 text-[11px] font-bold text-white hover:bg-gray-700"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 분류선택 - 드롭다운 (Custom UI) */}
        <div className="relative" ref={classificationDropdownRef}>
          <button
            onClick={() => setShowClassificationDropdown(!showClassificationDropdown)}
            className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
          >
            분류선택
          </button>

          {showClassificationDropdown && (
            <div className="absolute left-0 top-full z-30 mt-1 w-40 rounded-sm border border-gray-400 bg-white p-2 shadow-xl">
              <div className="flex flex-col gap-1.5">
                {classificationOptions.map(option => {
                  const isSelected = filterClassification === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleClassificationSelect(option)}
                      className={clsx(
                        'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] font-bold shadow-sm transition-all',
                        isSelected
                          ? 'bg-[#E67E22] text-white ring-1 ring-[#D35400]' /* Selected: Orange */
                          : 'bg-gray-400 text-white hover:bg-gray-500' /* Unselected: Grey */,
                      )}
                    >
                      {/* Checkbox Icon Mockup */}
                      <div
                        className={clsx(
                          'flex h-4 w-4 items-center justify-center rounded-[2px] border',
                          isSelected ? 'border-white bg-[#D35400]' : 'border-gray-200 bg-white',
                        )}
                      >
                        {isSelected && <i className="ri-check-line text-[10px] text-white"></i>}
                      </div>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex justify-center border-t border-gray-200 pt-2">
                <button
                  onClick={() => setShowClassificationDropdown(false)}
                  className="rounded bg-gray-600 px-4 py-1 text-[11px] font-bold text-white hover:bg-gray-700"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 생활실선택 - 드롭다운 (계층형) */}
        <div className="relative" ref={roomDropdownRef}>
          <button
            onClick={() => setShowRoomDropdown(!showRoomDropdown)}
            className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
          >
            생활실선택
          </button>

          {showRoomDropdown && (
            <div className="absolute left-0 top-full z-30 mt-1 w-[400px] rounded border border-[#B8D1E0] bg-white shadow-xl">
              {/* 상단: 층 탭 */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                {floors.map(floor => (
                  <button
                    key={floor}
                    onClick={() => setSelectedFloor(floor)}
                    className={clsx(
                      'px-4 py-2 text-[13px] font-medium transition-colors',
                      selectedFloor === floor
                        ? 'border-b-2 border-[#5C8D5A] bg-white text-[#5C8D5A]'
                        : 'text-gray-500 hover:text-gray-700',
                    )}
                  >
                    {floor}
                  </button>
                ))}
                {/* 전체보기 옵션 */}
                <button
                  onClick={() => handleRoomSelect('전체')}
                  className="ml-auto px-3 py-2 text-[12px] text-gray-500 hover:text-[#5C8D5A]"
                >
                  선택 해제 (전체)
                </button>
              </div>

              {/* 하단: 생활실 목록 Grid */}
              <div className="grid grid-cols-4 gap-2 p-3">
                {currentFloorRooms.map(room => {
                  const isSelected = filterRoom === room.roomName;
                  const isFull = room.currentCount >= room.capacity;

                  return (
                    <button
                      key={room.id}
                      onClick={() => handleRoomSelect(room.roomName)}
                      className={clsx(
                        'flex flex-col items-center justify-center rounded border p-2 transition-all',
                        isSelected
                          ? 'border-[#5C8D5A] bg-[#E8F5E9] text-[#2E5E2C]'
                          : 'border-gray-200 bg-white hover:border-[#5C8D5A] hover:bg-gray-50',
                      )}
                    >
                      <span className="text-[12px] font-bold">{room.roomName}</span>
                      <span className={clsx('mt-1 text-[11px]', isFull ? 'font-medium text-red-500' : 'text-gray-500')}>
                        ({room.currentCount}/{room.capacity})
                      </span>
                    </button>
                  );
                })}
                {currentFloorRooms.length === 0 && (
                  <div className="col-span-4 py-4 text-center text-[12px] text-gray-400">배정된 생활실이 없습니다.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 이름조회 (입력 필드 스타일) */}
        <div className="relative">
          <input
            type="text"
            placeholder="이름조회"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-16 border border-[#728292] px-2 py-1 text-[12px] font-medium outline-none focus:border-[#5C8D5A]"
          />
        </div>
        <button
          onClick={onAddResident}
          className="ml-1 border border-[#4A7548] bg-[#5C8D5A] px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#4A7548]"
        >
          신규등록
        </button>
      </div>

      {/* 2. 메인 테이블 영역 - 이미지의 연청록색 격자 및 헤더 스타일 적용 */}
      <div className="flex-1 overflow-auto border border-[#B8D1E0]">
        <table className="w-full border-collapse text-[13px]">
          <thead className="sticky top-0 z-20">
            <tr className="bg-[#E8F1F8] text-gray-700">
              {['연번', '현황', '수급자명', '생활실', '성별', '나이', '등급', '인정만료'].map(header => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b border-r border-[#B8D1E0] px-2 py-2 font-medium last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B8D1E0]">
            {residents.map((resident, index) => {
              const isSelected = selectedResident?.id === resident.id;

              // 나이 계산
              const birthYear = Number.parseInt(resident.birthDate.split('-')[0]);
              const age = 2026 - birthYear;

              return (
                <tr
                  key={resident.id}
                  onClick={() => onSelectResident(resident)}
                  className={clsx(
                    'cursor-pointer transition-colors',
                    isSelected ? 'bg-[#FFF9C4]' : 'bg-white hover:bg-blue-50/50',
                  )}
                >
                  <td className="whitespace-nowrap border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-500">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-800">
                    {resident.status}
                  </td>
                  <td
                    className={clsx(
                      'whitespace-nowrap border-r border-[#B8D1E0] px-2 py-1.5 text-center font-medium',
                      resident.status === '외출중' ? 'font-bold text-blue-600' : 'text-gray-900',
                    )}
                  >
                    {resident.name}
                  </td>
                  <td className="max-w-[80px] truncate border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-600">
                    {resident.room}
                  </td>
                  <td className="whitespace-nowrap border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-600">
                    {resident.gender}
                  </td>
                  <td className="whitespace-nowrap border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-600">
                    {age}
                  </td>
                  <td className="whitespace-nowrap border-r border-[#B8D1E0] px-2 py-1.5 text-center text-gray-800">
                    {resident.grade}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1.5 text-center text-gray-500 last:border-r-0">
                    {resident.gradeValidUntil}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. 하단 통계 바 - 이미지의 하단 디자인 재현 */}
      <div className="mt-3 flex items-center justify-between border border-[#B8D1E0] bg-[#E8F1F8] px-4 py-2">
        <div className="flex gap-6 text-[12px] font-medium text-[#2E6A9E]">
          <span className="flex items-center gap-1">▶ 전체:{stats.total}명</span>
          <span className="flex items-center gap-1">▶ 남자:{stats.male}명</span>
          <span className="flex items-center gap-1">▶ 여자:{stats.female}명</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="retired-check"
            checked={filterStatus === '퇴소'}
            onChange={e => onFilterChange(e.target.checked ? '퇴소' : '전체')}
            className="h-4 w-4 rounded-none border-[#B8D1E0] accent-[#5C8D5A]"
          />
          <label htmlFor="retired-check" className="cursor-pointer text-[12px] font-medium text-gray-700">
            퇴소자 포함 검색
          </label>
        </div>
      </div>
    </div>
  );
}
