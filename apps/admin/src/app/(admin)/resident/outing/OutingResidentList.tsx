/**
 * Description : OutingResidentPanel.tsx - 📌 이미지(image_81915e.png) 스타일이 적용된 외출·외박 대상자 리스트
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface Resident {
  id: number;
  name: string;
  gender: string;
  grade: string;
  admissionDate: string;
  room: string;
  birthDate: string;
  status: string;
}

interface RoomMaster {
  id: string;
  floor: string;
  roomName: string;
  capacity: number;
  currentCount: number;
}

interface Props {
  readonly residents: Resident[];
  readonly selectedResident: Resident | null;
  readonly onSelectResident: (resident: Resident) => void;
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly filterStatus: string;
  readonly onFilterStatusChange: (value: string) => void;
  readonly filterGrade: string;
  readonly onFilterGradeChange: (value: string) => void;
  readonly filterRoom: string;
  readonly onFilterRoomChange: (value: string) => void;
}

export default function OutingResidentPanel({
  residents,
  selectedResident,
  onSelectResident,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterGrade,
  onFilterGradeChange,
  filterRoom,
  onFilterRoomChange,
}: Props) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);

  const [rooms, setRooms] = useState<RoomMaster[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<string>('');

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const gradeDropdownRef = useRef<HTMLDivElement>(null);
  const roomDropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = ['전체', '입소중', '외출중', '외박중', '퇴소', '대기중'];
  const gradeOptions = [
    '전체',
    '1등급',
    '2등급',
    '3등급',
    '4등급',
    '5등급',
    '인지지원등급',
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
          const uniqueFloors = Array.from(new Set(data.map(r => r.floor))).sort((a, b) =>
            a.localeCompare(b),
          );
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
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(event.target as Node)) {
        setShowGradeDropdown(false);
      }
      if (roomDropdownRef.current && !roomDropdownRef.current.contains(event.target as Node)) {
        setShowRoomDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const floors = Array.from(new Set(rooms.map(r => r.floor))).sort((a, b) => a.localeCompare(b));
  const currentFloorRooms = rooms.filter(r => r.floor === selectedFloor);

  // 통계 계산
  const stats = {
    total: residents.length,
    male: residents.filter(r => r.gender === '남').length,
    female: residents.filter(r => r.gender === '여').length,
  };

  return (
    <div className="flex h-full w-[360px] flex-col border-r border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 상단 제어 및 검색 영역 */}
      <div className="border-b border-gray-200 bg-white p-2">
        <div className="mb-2 flex items-center justify-center gap-1 bg-[#E8F1F8] py-1 font-bold text-[#2E6A9E]">
          <i className="ri-arrow-left-s-line cursor-pointer"></i>
          <span className="text-[14px]">2026년</span>
          <i className="ri-arrow-right-s-line cursor-pointer"></i>
        </div>

        <div className="flex flex-wrap gap-1">

          {/* 현황선택 - 드롭다운 */}
          <div className="relative" ref={statusDropdownRef}>
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowGradeDropdown(false);
                setShowRoomDropdown(false);
              }}
              className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
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
                        onClick={() => {
                          onFilterStatusChange(option);
                          setShowStatusDropdown(false);
                        }}
                        className={clsx(
                          'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] font-bold shadow-sm transition-all',
                          isSelected
                            ? 'bg-[#E67E22] text-white ring-1 ring-[#D35400]'
                            : 'bg-gray-400 text-white hover:bg-gray-500',
                        )}
                      >
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

          {/* 등급선택 - 드롭다운 */}
          <div className="relative" ref={gradeDropdownRef}>
            <button
              onClick={() => {
                setShowGradeDropdown(!showGradeDropdown);
                setShowStatusDropdown(false);
                setShowRoomDropdown(false);
              }}
              className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
            >
              등급선택
            </button>

            {showGradeDropdown && (
              <div className="absolute left-0 top-full z-30 mt-1 w-36 rounded-sm border border-gray-400 bg-white p-2 shadow-xl">
                <div className="flex flex-col gap-1.5">
                  {gradeOptions.map(option => {
                    const isSelected = filterGrade === option;
                    return (
                      <button
                        key={option}
                        onClick={() => {
                          onFilterGradeChange(option);
                          setShowGradeDropdown(false);
                        }}
                        className={clsx(
                          'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] font-bold shadow-sm transition-all',
                          isSelected
                            ? 'bg-[#E67E22] text-white ring-1 ring-[#D35400]'
                            : 'bg-gray-400 text-white hover:bg-gray-500',
                        )}
                      >
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
                    onClick={() => setShowGradeDropdown(false)}
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
              onClick={() => {
                setShowRoomDropdown(!showRoomDropdown);
                setShowStatusDropdown(false);
                setShowGradeDropdown(false);
              }}
              className="border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A]"
            >
              생활실선택
            </button>

            {showRoomDropdown && (
              <div className="absolute left-0 top-full z-30 mt-1 w-[320px] rounded border border-[#B8D1E0] bg-white shadow-xl">
                {/* 층 탭 */}
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
                  <button
                    onClick={() => {
                      onFilterRoomChange('전체');
                      setShowRoomDropdown(false);
                    }}
                    className="ml-auto px-3 py-2 text-[12px] text-gray-500 hover:text-[#5C8D5A]"
                  >
                    선택 해제 (전체)
                  </button>
                </div>

                {/* 생활실 목록 Grid */}
                <div className="grid grid-cols-4 gap-2 p-3">
                  {currentFloorRooms.map(room => {
                    const isSelected = filterRoom === room.roomName;
                    const isFull = room.currentCount >= room.capacity;
                    return (
                      <button
                        key={room.id}
                        onClick={() => {
                          onFilterRoomChange(room.roomName);
                          setShowRoomDropdown(false);
                        }}
                        className={clsx(
                          'flex flex-col items-center justify-center rounded border p-2 transition-all',
                          isSelected
                            ? 'border-[#5C8D5A] bg-[#E8F5E9] text-[#2E5E2C]'
                            : 'border-gray-200 bg-white hover:border-[#5C8D5A] hover:bg-gray-50',
                        )}
                      >
                        <span className="text-[12px] font-bold">{room.roomName}</span>
                        <span
                          className={clsx(
                            'mt-1 text-[11px]',
                            isFull ? 'font-medium text-red-500' : 'text-gray-500',
                          )}
                        >
                          ({room.currentCount}/{room.capacity})
                        </span>
                      </button>
                    );
                  })}
                  {currentFloorRooms.length === 0 && (
                    <div className="col-span-4 py-4 text-center text-[12px] text-gray-400">
                      배정된 생활실이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 이름 조회 */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="이름 조회"
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full border border-[#728292] px-2 py-1 text-[11px] font-medium outline-none focus:border-[#57A5CE]"
            />
          </div>
        </div>
      </div>

      {/* 2. 메인 테이블 영역 */}
      <div className="mx-2 my-1 flex-1 overflow-auto border-x border-b border-[#B8D1E0]">
        <table className="w-full border-collapse text-[12px]">
          <thead className="sticky top-0 z-20">
            <tr className="bg-[#E8F1F8] text-gray-700">
              {['연번', '현황', '수급자명', '성별', '등급', '생활실'].map(header => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b border-r border-[#B8D1E0] px-1 py-2 font-medium last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B8D1E0]">
            {residents.map((resident, index) => {
              const isSelected = selectedResident?.id === resident.id;
              return (
                <tr
                  key={resident.id}
                  onClick={() => onSelectResident(resident)}
                  className={clsx(
                    'h-[32px] cursor-pointer transition-colors',
                    isSelected ? 'bg-[#DCF2D8]' : 'bg-white hover:bg-blue-50/50',
                  )}
                >
                  <td className="border-r border-[#B8D1E0] text-center text-gray-500">{index + 1}</td>
                  <td className="border-r border-[#B8D1E0] text-center text-gray-800">{resident.status}</td>
                  <td className="border-r border-[#B8D1E0] text-center font-bold text-gray-900">{resident.name}</td>
                  <td className="border-r border-[#B8D1E0] text-center text-gray-600">{resident.gender}</td>
                  <td className="border-r border-[#B8D1E0] text-center text-gray-800">{resident.grade}</td>
                  <td className="text-center text-gray-600">{resident.room}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. 하단 통계 바 */}
      <div className="flex items-center border-t border-[#B8D1E0] bg-[#E8F1F8] px-3 py-1.5 text-[11px] font-medium text-[#2E6A9E]">
        <div className="flex gap-4">
          <span>▸ 전체 : {stats.total}명</span>
          <span>▸ 남자 : {stats.male}명</span>
          <span>▸ 여자 : {stats.female}명</span>
        </div>
      </div>
    </div>
  );
}
