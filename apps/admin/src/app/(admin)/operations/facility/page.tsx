/**
 * Description : page.tsx - 건물 및 생활실 설정 (Facility & Room Management)
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

// 생활실(Room) 인터페이스
interface Resident {
  name: string;
  gender: '남' | '여';
  age: number;
}

interface Room {
  id: string;
  name: string;
  tags: string[];
  residents: Resident[];
  capacity: number;
  type?: 'dementia' | 'premium' | 'special' | 'normal';
}

interface Floor {
  level: string;
  rooms: Room[];
}

interface Building {
  id: string;
  name: string;
  floors: Floor[];
}

export default function FacilityManagement() {
  const [activeBuildingId, setActiveBuildingId] = useState('b1');
  const [filters, setFilters] = useState({
    remainingOnly: false,
    premiumOnly: false,
    dementiaOnly: false,
    specialOnly: false,
  });

  // 샘플 데이터 (이미지 참고)
  const buildings: Building[] = [
    {
      id: 'b1',
      name: '그린게이블',
      floors: [
        {
          level: '1층',
          rooms: [
            {
              id: 'r1',
              name: '계양새일요양원4호',
              tags: [],
              residents: [
                { name: '유명순', gender: '여', age: 83 },
                { name: '홍길동', gender: '남', age: 96 },
                { name: '이공달달', gender: '남', age: 96 },
              ],
              capacity: 4,
            },
            {
              id: 'r2',
              name: '홍길동',
              tags: ['치매(가)'],
              residents: [{ name: '홍길동', gender: '남', age: 80 }],
              capacity: 3,
              type: 'dementia',
            },
            {
              id: 'r3',
              name: '새일요양원8호',
              tags: [],
              residents: [
                { name: '김철민민', gender: '남', age: 96 },
                { name: '홍동길', gender: '남', age: 91 },
              ],
              capacity: 1,
            },
            {
              id: 'r4',
              name: '홍길동222',
              tags: [],
              residents: [
                { name: '정보연', gender: '여', age: 96 },
                { name: '김사랑', gender: '여', age: 81 },
              ],
              capacity: 2,
            },
            {
              id: 'r5',
              name: '비오는날의수채화',
              tags: [],
              residents: [
                { name: '어르신', gender: '남', age: 81 },
                { name: '수급자12', gender: '남', age: 96 },
              ],
              capacity: 2,
            },
            {
              id: 'r6',
              name: '3호실',
              tags: [],
              residents: [
                { name: '임영희', gender: '여', age: 49 },
                { name: '이복자', gender: '여', age: 94 },
                { name: '들봄', gender: '남', age: 96 },
              ],
              capacity: 2,
            },

            {
              id: 'r7',
              name: '성심원',
              tags: ['상급 0원'],
              residents: [{ name: '이행복', gender: '여', age: 93 }],
              capacity: 2,
              type: 'premium',
            },
            {
              id: 'r8',
              name: '개나리',
              tags: [],
              residents: [
                { name: '이성원', gender: '남', age: 43 },
                { name: '이쁜연화', gender: '여', age: 64 },
                { name: '김수급', gender: '여', age: 96 },
              ],
              capacity: 3,
            },
            { id: 'r9', name: '야구공', tags: [], residents: [{ name: '임꺽정', gender: '남', age: 88 }], capacity: 9 },
            { id: 'r10', name: '푸름이', tags: ['치매(가)', '상급 0원'], residents: [], capacity: 1, type: 'dementia' },
            {
              id: 'r11',
              name: '행복방',
              tags: [],
              residents: [{ name: '홍길동', gender: '남', age: 96 }],
              capacity: 2,
            },
            {
              id: 'r12',
              name: '미소방',
              tags: ['치매(가)'],
              residents: [
                { name: '정도도', gender: '여', age: 81 },
                { name: '안웅기', gender: '남', age: 45 },
                { name: '제칼공순', gender: '여', age: 85 },
              ],
              capacity: 10,
              type: 'dementia',
            },

            {
              id: 'r13',
              name: '노랑나비실',
              tags: ['전문요양실'],
              residents: [
                { name: '김씨', gender: '여', age: 55 },
                { name: '이정재', gender: '남', age: 86 },
                { name: '윤ㄴㄴ', gender: '여', age: 80 },
                { name: '구시민', gender: '여', age: 90 },
              ],
              capacity: 4,
              type: 'special',
            },
            {
              id: 'r14',
              name: '101',
              tags: ['상급 0원'],
              residents: [
                { name: '서정우', gender: '여', age: 26 },
                { name: '유춘지', gender: '여', age: 87 },
                { name: '심정순', gender: '여', age: 88 },
              ],
              capacity: 1,
              type: 'premium',
            },
            {
              id: 'r15',
              name: '신규신규',
              tags: [],
              residents: [
                { name: '김로이', gender: '여', age: 86 },
                { name: '조분입', gender: '여', age: 87 },
              ],
              capacity: 5,
            },
            {
              id: 'r16',
              name: '래미안실',
              tags: [],
              residents: [
                { name: '이오수', gender: '남', age: 88 },
                { name: '박말자', gender: '여', age: 96 },
                { name: '김첨지', gender: '여', age: 10 },
              ],
              capacity: 7,
            },
            {
              id: 'r17',
              name: '2호실',
              tags: [],
              residents: [
                { name: '김나나', gender: '여', age: 76 },
                { name: '한기연', gender: '여', age: 94 },
                { name: 'ㅁㄴㅇㄹ', font: '남', age: 96 },
              ],
              capacity: 3,
            },
            {
              id: 'r18',
              name: '은혜실',
              tags: [],
              residents: [
                { name: '홍길순', gender: '여', age: 85 },
                { name: '아무개', gender: '여', age: 80 },
                { name: '황계화', gender: '여', age: 78 },
              ],
              capacity: 2,
            },

            { id: 'r19', name: 'ㅋㅋㅋㅋ', tags: [], residents: [], capacity: 2 },
            { id: 'r20', name: '장미', tags: [], residents: [], capacity: 3 },
          ],
        },
      ],
    },
    { id: 'b2', name: '본관A', floors: [] },
    { id: 'b3', name: '본관B', floors: [] },
    { id: 'b4', name: '본관C', floors: [] },
    { id: 'b5', name: '수레 (수정금지)', floors: [] },
    { id: 'b6', name: '신관A', floors: [] },
    { id: 'b7', name: '신관B', floors: [] },
    { id: 'b8', name: '신관C', floors: [] },
    { id: 'b9', name: '신관D', floors: [] },
    { id: 'b10', name: '신관E', floors: [] },
    { id: 'b11', name: '테스트', floors: [] },
  ];

  const activeBuilding = buildings.find(b => b.id === activeBuildingId) || buildings[0];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8FAFC] text-gray-800 antialiased">
      {/* 1. 상단 탭 헤더 */}
      <div className="z-10 flex bg-[#607D8B] text-white shadow-md">
        {buildings.map(build => (
          <button
            key={build.id}
            onClick={() => setActiveBuildingId(build.id)}
            className={clsx(
              'border-r border-[#ffffff20] px-5 py-2.5 text-[12px] font-bold transition-all',
              activeBuildingId === build.id
                ? 'mt-[-2px] h-[calc(100%+2px)] border-t-2 border-t-[#2E6A9E] bg-white text-[#2E6A9E]'
                : 'hover:bg-[#ffffff10]',
            )}
          >
            {build.name}
          </button>
        ))}
      </div>

      {/* 2. 필터 바 */}
      <div className="flex flex-col gap-2 border-b border-[#B8D1E0] bg-white p-3 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold">
          <label className="flex cursor-pointer items-center gap-1.5">
            <input type="checkbox" className="h-4 w-4 rounded border-[#B8D1E0]" />
            <span>정원이 남은 생활실만 조회</span>
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input type="checkbox" className="h-4 w-4 rounded border-[#B8D1E0]" />
            <span>상급침실만 조회</span>
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input type="checkbox" className="h-4 w-4 rounded border-[#B8D1E0]" />
            <span>치매전담실만 조회</span>
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input type="checkbox" className="h-4 w-4 rounded border-[#B8D1E0]" />
            <span>전문요양실만 조회</span>
          </label>
        </div>

        <div className="flex items-center gap-4 text-[12px] font-bold lg:ml-10">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 border border-[#FBC02D] bg-[#FFF9C4]"></div>
            <span>정원 남음</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 border border-gray-300 bg-white"></div>
            <span>정원 충족</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 border border-[#E53935] bg-[#FFCDD2]"></div>
            <span>정원 초과</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1 border border-gray-300 bg-white px-3 py-1 text-[11px] font-bold text-gray-600 shadow-sm hover:bg-gray-50">
            생활실 설정 이용안내 <i className="ri-question-line text-[#2E6A9E]"></i>
          </button>
          <button className="flex items-center gap-1 bg-[#4CAF50] px-4 py-1 text-[11px] font-bold text-white shadow-md hover:bg-[#43A047]">
            건물 정보 관리
          </button>
        </div>
      </div>

      {/* 3. 대시보드 콘텐츠 영역 */}
      <div className="flex-1 overflow-auto bg-[#E3F2FD]/30 p-4">
        <div className="flex">
          {activeBuilding.floors.map((floor, fIdx) => (
            <div key={fIdx} className="flex w-full">
              {/* 왼쪽 층 표시 */}
              <div className="flex w-16 items-center justify-center border-r border-[#B8D1E0] bg-white">
                <span className="text-[14px] font-black text-[#2E6A9E]">{floor.level}</span>
              </div>

              {/* 생활실 그리드 */}
              <div className="flex-1 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {floor.rooms.map(room => {
                    const currentCount = room.residents.length;
                    const isExceeded = currentCount > room.capacity;
                    const isFull = currentCount === room.capacity;
                    const hasSpace = currentCount < room.capacity;

                    return (
                      <div
                        key={room.id}
                        className={clsx(
                          'flex h-[180px] flex-col border p-2 shadow-md transition-all',
                          isExceeded
                            ? 'border-[#EF9A9A] bg-[#FFCDD2]'
                            : hasSpace
                              ? 'border-[#FFF59D] bg-[#FFF9C4]'
                              : 'border-gray-200 bg-white',
                        )}
                      >
                        {/* 룸 헤더 */}
                        <div className="mb-2 flex items-start justify-between">
                          <h3 className="max-w-[70%] truncate text-[14px] font-black tracking-tighter">{room.name}</h3>
                          <div className="flex flex-col items-end gap-1">
                            {room.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={clsx(
                                  'px-2 py-0.5 text-[10px] font-black italic',
                                  tag.includes('치매')
                                    ? 'bg-[#AED581] text-[#33691E]'
                                    : tag.includes('상급')
                                      ? 'bg-[#64B5F6] text-white'
                                      : 'bg-[#BA68C8] text-white',
                                )}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 거주자 명단 */}
                        <div className="custom-scrollbar mb-2 flex-1 overflow-y-auto pr-1">
                          {room.residents.map((res, rIdx) => (
                            <div key={rIdx} className="text-[12px] font-bold leading-tight text-gray-700">
                              {rIdx + 1}. {res.name}{' '}
                              <span className="font-medium text-gray-400">
                                ({res.gender}/{res.age}세)
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* 룸 푸터 */}
                        <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-2">
                          {isExceeded && (
                            <span className="rounded-sm bg-[#E53935] px-1.5 py-0.5 text-[10px] font-black text-white">
                              정원초과
                            </span>
                          )}
                          <div className="flex-1"></div>
                          <span className="rounded-full border border-gray-300 bg-white/80 px-2 py-0.5 text-[11px] font-black text-gray-600">
                            {currentCount}/{room.capacity}명{' '}
                            <span className="text-[10px] font-medium">(입소/정원)</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00000010;
          border-radius: 2px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #00000020;
        }
      `}</style>
    </div>
  );
}
