/**
 * Description : page.tsx - SNS 발송 관리 (문자/알림톡)
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

// 가상 데이터: 수급자/보호자 리스트
const MOCK_RECIPIENTS = [
  {
    id: 1,
    status: '입소중',
    name: '20원',
    grade: '2등급',
    room: '',
    guardian: '',
    relation: '',
    phone: '010-1234-1234',
  },
  {
    id: 2,
    status: '입소중',
    name: 'ㅁㄴㅇㄹ',
    grade: '등급외',
    room: '2호실',
    guardian: '11',
    relation: '22',
    phone: '010-1231-2312',
  },
  {
    id: 3,
    status: '입소중',
    name: 'ㅈㄷㄹㅈㄷㄹ',
    grade: '1등급',
    room: '다용실',
    guardian: '',
    relation: '',
    phone: '010-3232-3223',
  },
  {
    id: 4,
    status: '입소중',
    name: '가나다',
    grade: '4등급',
    room: '너와나',
    guardian: '김사랑',
    relation: '딸',
    phone: '010-2343-1004',
  },
  {
    id: 5,
    status: '입소중',
    name: '가나다',
    grade: '2등급',
    room: '',
    guardian: '',
    relation: '',
    phone: '010-1234-5678',
  },
  {
    id: 6,
    status: '입소중',
    name: '가나당',
    grade: '3등급',
    room: '다용실2',
    guardian: '김가나',
    relation: '딸',
    phone: '010-2345-6789',
  },
  {
    id: 7,
    status: '입소중',
    name: '강계희',
    grade: '3등급',
    room: '소망',
    guardian: '송자경',
    relation: '아들',
    phone: '010-1212-1212',
  },
  {
    id: 8,
    status: '입소중',
    name: '강으뜸',
    grade: '3등급',
    room: '특실',
    guardian: '강소망',
    relation: '자',
    phone: '010-1234-5678',
  },
  {
    id: 9,
    status: '입소중',
    name: '강춘애',
    grade: '3등급',
    room: '계양새일요양원6호',
    guardian: '김진숙',
    relation: '딸',
    phone: '010-8754-3259',
  },
  {
    id: 10,
    status: '입소중',
    name: '고길동',
    grade: '3등급',
    room: '초록',
    guardian: '',
    relation: '',
    phone: '010-3333-3333',
  },
  {
    id: 11,
    status: '입소중',
    name: '고수례',
    grade: '4등급',
    room: '무지개',
    guardian: '홍길동',
    relation: '자',
    phone: '010-2225-6978',
  },
  {
    id: 12,
    status: '입소중',
    name: '구시민',
    grade: '2등급',
    room: '노랑나비실',
    guardian: '구시민딸',
    relation: '딸',
    phone: '010-1234-5678',
  },
  {
    id: 13,
    status: '입소중',
    name: '김김',
    grade: '등급외',
    room: '맹꽁이친구',
    guardian: '123',
    relation: '',
    phone: '010-1234-1234',
  },
  {
    id: 14,
    status: '입소중',
    name: '김길동',
    grade: '',
    room: '예쁜이방',
    guardian: '김가나',
    relation: '아들',
    phone: '010-1234-5678',
  },
  {
    id: 15,
    status: '입소중',
    name: '김꽃님',
    grade: '3등급',
    room: '장미1호',
    guardian: '김아무개',
    relation: '',
    phone: '010-1234-1234',
  },
  {
    id: 16,
    status: '입소중',
    name: '김나나',
    grade: '4등급',
    room: '2호실',
    guardian: '김도래미',
    relation: '딸',
    phone: '010-2222-3333',
  },
  {
    id: 17,
    status: '입소중',
    name: '김나영',
    grade: '5등급',
    room: '101-1',
    guardian: '이소영',
    relation: '첫째딸',
    phone: '010-1234-4567',
  },
];

export default function SnsManagementPage() {
  const [selectedList, setSelectedList] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('보호자');

  const handleSelect = (item: any) => {
    if (selectedList.find(i => i.id === item.id)) return;
    setSelectedList([...selectedList, item]);
  };

  const handleRemove = (id: number) => {
    setSelectedList(selectedList.filter(i => i.id !== id));
  };

  const sectionHeaderClass =
    'bg-[#E3F2FD] border border-[#B8D1E0] px-2 py-1.5 text-[13px] font-bold text-[#2E6A9E] flex items-center gap-1.5';
  const grayBtnClass =
    'bg-[#8FA1B0] hover:bg-[#7D8E9D] text-white px-2 py-1 text-[11px] rounded-[2px] transition-colors';
  const whiteBtnClass =
    'bg-white border border-[#B8D1E0] hover:bg-gray-50 text-gray-700 px-2 py-1 text-[11px] rounded-[2px] transition-colors';

  return (
    <div className="flex h-screen flex-col gap-3 overflow-hidden bg-[#f0f2f5] p-3 font-sans text-gray-800 antialiased lg:flex-row">
      {/* 1. 발송대상자 선택 (좌측) */}
      <div className="flex flex-[4.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className={sectionHeaderClass}>
          <i className="ri-checkbox-multiple-line"></i>
          <span>발송대상자 선택</span>
        </div>

        {/* 상단 탭 */}
        <div className="flex border-b border-[#B8D1E0] bg-[#E3F2FD]/50">
          {['보호자', '수급자', '직원', '기타'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'border-r border-[#B8D1E0] px-6 py-2 text-[12px] font-bold',
                activeTab === tab ? 'mt-[-1px] border-t-2 border-t-[#2E6A9E] bg-white text-[#2E6A9E]' : 'text-gray-500',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 필터 및 검색 */}
        <div className="flex flex-wrap items-center gap-1 border-b border-[#B8D1E0] bg-gray-50 p-2">
          <button className={grayBtnClass}>현황선택</button>
          <button className={grayBtnClass}>등급선택</button>
          <button className={grayBtnClass}>생활실선택</button>
          <div className="ml-1 flex items-center gap-1 border border-[#B8D1E0] bg-white px-2 py-0.5">
            <span className="text-[11px] text-gray-400">수급자 이름</span>
            <input type="text" className="w-16 text-[11px] outline-none" />
          </div>
          <div className="flex items-center gap-1 border border-[#B8D1E0] bg-white px-2 py-0.5">
            <span className="text-[11px] text-gray-400">휴대폰 번호</span>
            <input type="text" className="w-24 text-[11px] outline-none" />
          </div>
          <label className="ml-2 flex cursor-pointer items-center gap-1 text-[11px] font-bold">
            <input type="checkbox" className="h-3 w-3" defaultChecked /> 주 보호자만 검색
          </label>
          <select className="ml-auto border border-[#B8D1E0] px-1 py-0.5 text-[11px]">
            <option>전체</option>
          </select>
        </div>

        {/* 리스트 테이블 */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead className="sticky top-0 z-10 bg-[#E8F1F8] font-bold text-gray-600 shadow-sm">
              <tr>
                <th className="w-8 border-b border-[#B8D1E0] p-1">
                  <input type="checkbox" disabled />
                </th>
                <th className="w-10 border-b border-[#B8D1E0] p-1">연번</th>
                <th className="border-b border-[#B8D1E0] p-1">현황</th>
                <th className="border-b border-[#B8D1E0] p-1">수급자명</th>
                <th className="border-b border-[#B8D1E0] p-1">등급</th>
                <th className="border-b border-[#B8D1E0] p-1">생활실</th>
                <th className="border-b border-[#B8D1E0] p-1 text-blue-700">보호자명</th>
                <th className="border-b border-[#B8D1E0] p-1">관계</th>
                <th className="border-b border-[#B8D1E0] p-1 text-blue-700">휴대폰번호</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_RECIPIENTS.map((item, idx) => (
                <tr
                  key={item.id}
                  className="cursor-pointer transition-colors hover:bg-blue-50"
                  onClick={() => handleSelect(item)}
                >
                  <td className="border-r border-gray-100 p-1 text-center">
                    <input type="checkbox" readOnly checked={!!selectedList.find(i => i.id === item.id)} />
                  </td>
                  <td className="border-r border-gray-100 p-2 text-center font-bold text-green-700">{idx + 1}</td>
                  <td className="border-r border-gray-100 p-2 text-center">{item.status}</td>
                  <td className="border-r border-gray-100 p-2 font-bold">{item.name}</td>
                  <td className="border-r border-gray-100 p-2 text-center">{item.grade}</td>
                  <td className="border-r border-gray-100 p-2 text-center">{item.room}</td>
                  <td className="border-r border-gray-100 p-2 text-center">{item.guardian}</td>
                  <td className="border-r border-gray-100 p-2 text-center">{item.relation}</td>
                  <td className="p-2 text-center font-medium text-blue-600">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between border-t border-[#B8D1E0] bg-gray-50 p-2 text-[11px] font-bold">
          <div>전체:{MOCK_RECIPIENTS.length}명</div>
          <label className="flex cursor-pointer items-center gap-1">
            <input type="checkbox" className="h-3 w-3" /> 퇴소자 포함 검색
          </label>
        </div>
      </div>

      {/* 중앙 화살표 아이콘 (데스크탑에서만) */}
      <div className="hidden items-center justify-center lg:flex">
        <i className="ri-arrow-right-double-line text-2xl text-[#2E6A9E]"></i>
      </div>

      {/* 2. 발송대상자 확인 (중앙) */}
      <div className="flex flex-[2.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className={sectionHeaderClass}>
          <i className="ri-checkbox-line"></i>
          <span>발송대상자 확인</span>
        </div>
        <div className="flex flex-col gap-1 border-b border-[#B8D1E0] bg-gray-50 p-2">
          <div className="text-[11px] font-bold">받는사람 (총 {selectedList.length}명)</div>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="이름"
              className="w-16 border border-[#B8D1E0] px-2 py-0.5 text-[11px] shadow-inner outline-none"
            />
            <input
              type="text"
              placeholder="휴대폰번호"
              className="flex-1 border border-[#B8D1E0] px-2 py-0.5 text-[11px] shadow-inner outline-none"
            />
            <button className={whiteBtnClass}>추가</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-white p-2">
          <div className="flex flex-col gap-1">
            {selectedList.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-[11px] text-gray-300">
                대상자를 리스트에서 선택하세요
              </div>
            ) : (
              selectedList.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-sm border border-blue-100 bg-blue-50/50 p-1.5"
                >
                  <span className="text-[11px] font-bold">
                    {item.name} ({item.phone})
                  </span>
                  <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500">
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-[#B8D1E0] bg-gray-50 p-2">
          <button onClick={() => setSelectedList([])} className={whiteBtnClass}>
            전체삭제
          </button>
        </div>
      </div>

      {/* 3. 문자발송내용 (우측) */}
      <div className="flex flex-[3] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className="flex bg-[#8FA1B0] text-[12px] font-bold text-white">
          <button className="border-b border-white bg-white px-4 py-2 text-[#2E6A9E]">문자발송 내용</button>
          <button className="px-4 py-2 opacity-80">문자발송 내역</button>
          <button className="px-4 py-2 opacity-80">예약발송대기 내역</button>
        </div>

        <div className="flex flex-col gap-2 bg-white p-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
            <span className="text-gray-500">문자 발신번호</span>
            <span className="font-bold">010-5594-2908</span>
            <span className="text-gray-500">잔여건수</span>
            <div className="flex items-center justify-between font-bold text-blue-600 underline decoration-dotted">
              0건
              <button className="cursor-pointer rounded-[2px] border border-blue-400 bg-white px-1 py-0.5 text-[10px]">
                충전하기
              </button>
            </div>
            <span className="text-gray-500">
              문자 종류 <i className="ri-question-line text-gray-300"></i>
            </span>
            <span className="font-bold">문자(SMS)</span>
            <span className="text-gray-500">차감건수</span>
            <span className="font-bold">
              문자(1건) x {selectedList.length}명 = {selectedList.length}건 차감
            </span>
          </div>

          <label className="mt-2 flex items-center gap-1 text-[11px] font-bold text-gray-400">
            <input type="checkbox" className="h-3 w-3" /> 예약발송 <i className="ri-question-line"></i>
          </label>

          <div className="relative rounded-sm border border-[#B8D1E0] bg-[#F8FAFC]">
            <textarea
              className="h-80 w-full resize-none bg-transparent p-3 text-[13px] leading-normal outline-none placeholder:text-gray-300"
              placeholder="발송하실 문자 내용을 입력하시기 바랍니다."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <div className="absolute bottom-2 right-3 text-[11px] font-bold text-gray-400">
              {new Blob([message]).size} Byte
            </div>
          </div>

          <div className="flex gap-1">
            <button className="flex-1 rounded-sm border border-blue-400 py-1.5 text-[11px] font-bold text-blue-600 hover:bg-blue-50">
              발송 문자 선택
            </button>
            <button
              onClick={() => setMessage('')}
              className="rounded-sm bg-[#E57373] px-4 py-1.5 text-[11px] font-bold text-white hover:bg-[#EF5350]"
            >
              지우기
            </button>
          </div>

          <div className="mt-2 flex h-32 flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-[#B8D1E0] bg-gray-50 p-4 text-[#8FA1B0]">
            <i className="ri-image-add-line text-3xl"></i>
            <div className="text-center text-[10px] font-bold">
              이미지 첨부
              <br />
              <span className="mt-1 inline-block rounded-sm bg-[#8FA1B0] px-2 py-0.5 text-white">파일선택</span>
              <br />
              (jpg 형식)
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-[#B8D1E0] bg-gray-50 p-3">
          <button className="w-full rounded bg-[#1e88e5] py-2.5 font-black text-white shadow-md transition-all hover:bg-[#1976d2] active:scale-[0.98]">
            문자발송
          </button>
        </div>
      </div>
    </div>
  );
}
