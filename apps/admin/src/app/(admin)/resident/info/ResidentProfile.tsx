/**
 * Description : ResidentProfile.tsx - 📌 입소자 정보 관리 프로필 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import clsx from 'clsx';

interface Props {
  readonly resident: any;
  readonly getStatusColor?: (status: string) => string;
  readonly getGradeColor?: (grade: string) => string;
  readonly onDownloadContract?: () => void;
}

export default function ResidentProfile({ resident }: Props) {
  if (!resident) return null;

  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[13px] font-bold text-gray-700 w-[120px] shrink-0';
  const tdClass = 'border border-[#B8D1E0] px-3 py-1.5 text-[13px] text-gray-900';
  const btnTiny =
    'rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-normal text-gray-600 hover:bg-gray-50 shrink-0 ml-2';

  return (
    <div className="w-full bg-white font-sans antialiased">
      {/*
        -------------------------------------------------------------------------
        [Mobile View] md:hidden
        -------------------------------------------------------------------------
      */}
      <div className="flex flex-col gap-3 p-3 lg:hidden">
        {/* 1. 상단 프로필 카드 (사진 + 기본정보) */}
        <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          {/* 사진 */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
            <i className="ri-user-fill text-4xl text-gray-300"></i>
          </div>

          {/* 기본 정보 */}
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-lg font-bold text-gray-900">{resident.name}</h3>
              <span
                className={clsx(
                  'shrink-0 rounded px-2 py-0.5 text-xs font-bold',
                  resident.status === '입소' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600',
                )}
              >
                {resident.status}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {resident.gender} · 만 {resident.age}세
            </div>
            <div className="flex min-w-0 items-center gap-2 text-sm text-gray-700">
              <span className="shrink-0 font-semibold text-[#5C8D5A]">{resident.room}</span>
              <span className="h-3 w-px shrink-0 bg-gray-300"></span>
              <span className="truncate">{resident.birthDate}</span>
            </div>
          </div>
        </div>

        {/* 2. 상세 정보 — 라벨(좌) + 값(우) 1열 구조 */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

          {/* 연락처 */}
          <div className="flex items-center border-b border-gray-100">
            <div className="w-[90px] shrink-0 bg-[#E8F1F8] px-3 py-2.5 text-[11px] font-bold text-gray-600">연락처</div>
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5">
              <span className="truncate text-[13px] font-medium text-gray-900">{resident.phone}</span>
              <a
                href={`tel:${resident.phone}`}
                className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600"
              >
                <i className="ri-phone-fill text-xs"></i>
              </a>
            </div>
          </div>

          {/* 장기요양등급 */}
          <div className="flex items-center border-b border-gray-100">
            <div className="w-[90px] shrink-0 bg-[#E8F1F8] px-3 py-2.5 text-[11px] font-bold text-gray-600">장기요양등급</div>
            <div className="min-w-0 flex-1 px-3 py-2.5">
              <span className="text-[13px] font-medium text-gray-900">{resident.grade}</span>
              <span className="ml-1 text-[11px] text-gray-400">({resident.copaymentRate}%)</span>
            </div>
          </div>

          {/* 입소일자 */}
          <div className="flex items-center border-b border-gray-100">
            <div className="w-[90px] shrink-0 bg-[#E8F1F8] px-3 py-2.5 text-[11px] font-bold text-gray-600">입소일자</div>
            <div className="min-w-0 flex-1 px-3 py-2.5 text-[13px] font-medium text-gray-900">{resident.admissionDate}</div>
          </div>

          {/* 등급유효기간 */}
          <div className="flex items-center border-b border-gray-100">
            <div className="w-[90px] shrink-0 bg-[#E8F1F8] px-3 py-2.5 text-[11px] font-bold text-gray-600">등급유효기간</div>
            <div className="min-w-0 flex-1 px-3 py-2.5 text-[12px] font-medium text-gray-900">
              {resident.gradeValidUntil} 까지
            </div>
          </div>

          {/* 주요질환 */}
          <div className="flex items-start border-b border-gray-100">
            <div className="w-[90px] shrink-0 bg-[#E8F1F8] px-3 py-2.5 text-[11px] font-bold text-gray-600">주요질환</div>
            <div className="min-w-0 flex-1 px-3 py-2.5 text-[13px] leading-snug text-gray-800">
              {resident.diseases || '-'}
            </div>
          </div>

          {/* 거주지 */}
          <div className="flex items-start">
            <div className="w-[90px] shrink-0 bg-[#E8F1F8] px-3 py-2.5 text-[11px] font-bold text-gray-600">거주지</div>
            <div className="min-w-0 flex-1 break-keep px-3 py-2.5 text-[13px] leading-snug text-gray-800">
              {resident.address}
            </div>
          </div>
        </div>

        {/* 3. 메모 카드 (별도 분리) */}
        {resident.memo && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 shadow-sm">
            <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-yellow-700">
              <i className="ri-sticky-note-fill"></i> 특이사항 (메모)
            </div>
            <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-gray-800">{resident.memo}</div>
          </div>
        )}
      </div>

      {/*
        -------------------------------------------------------------------------
        [PC View] hidden md:flex
        기존 코드 그대로 유지하되 hidden md:flex 래퍼로 감싸서 분기처리
        -------------------------------------------------------------------------
      */}
      <div className="hidden w-full border-collapse border border-[#B8D1E0] lg:flex">
        {/* 좌측 사진 섹션: 높이를 표 전체와 동기화 */}
        <div className="flex w-[180px] shrink-0 flex-col items-center justify-center border-r border-[#B8D1E0] bg-white p-3">
          <div className="relative mb-2 flex h-[180px] w-[140px] items-center justify-center border border-dashed border-gray-300 bg-gray-50">
            <i className="ri-user-fill text-6xl text-gray-200"></i>
          </div>
          <div className="w-[140px] border border-[#B8D1E0] bg-[#F8FAFC] py-1 text-center font-bold text-gray-800">
            {resident.name}
          </div>
        </div>

        {/* 우측 상세 정보 테이블: table-fixed를 통해 너비와 높이를 꽉 채움 */}
        <div className="flex-1">
          <table className="h-full w-full table-fixed border-collapse border-hidden">
            <tbody>
              {/* Row 1 */}
              <tr>
                <th className={thClass}>입소자명</th>
                <td className={tdClass}>
                  {resident.name} ({resident.gender}/만{resident.age}세)
                </td>
                <th className={thClass}>생년월일</th>
                <td className={tdClass}>{resident.birthDate}</td>
                <th className={thClass}>생신일</th>
                <td className={tdClass}>{resident.birthDate} (음력)</td>
              </tr>
              {/* Row 2 */}
              <tr>
                <th className={thClass}>인정등급</th>
                <td colSpan={3} className={tdClass}>
                  <div className="flex items-center justify-between">
                    <span>
                      <span className="font-bold text-blue-800">{resident.grade}</span> ({resident.gradeValidFrom} ~{' '}
                      {resident.gradeValidUntil})
                    </span>
                    <button className={clsx(btnTiny, 'border-[#57A5CE] bg-[#E8F1F8] font-bold text-[#2E6A9E]')}>
                      인정등급 변경/갱신
                    </button>
                  </div>
                </td>
                <th className={thClass}>인정번호</th>
                <td className={tdClass}>{resident.certNo}</td>
              </tr>
              {/* Row 3 */}
              <tr>
                <th className={thClass}>입소일시</th>
                <td className={tdClass}>
                  <div className="flex items-center justify-between">
                    <span>{resident.admissionDate}</span>
                    <button className={btnTiny}>이력수정</button>
                  </div>
                </td>
                <th className={thClass}>본인부담률</th>
                <td className={tdClass}>
                  <div className="flex items-center justify-between">
                    <span>{resident.copaymentRate}%</span>
                    <button className={btnTiny}>변경</button>
                  </div>
                </td>
                <th className={thClass}>연락처</th>
                <td className={tdClass}>{resident.phone}</td>
              </tr>
              {/* Row 4 */}
              <tr>
                <th className={thClass}>주소</th>
                <td colSpan={3} className={tdClass}>
                  {resident.address}
                </td>
                <th className={thClass}>주요질환</th>
                <td className={tdClass}>{resident.diseases || '-'}</td>
              </tr>
              {/* Row 5 & 6 병합구조: 비고 칸이 하단까지 꽉 차도록 rowSpan 설정 */}
              <tr>
                <th className={thClass}>수급현황</th>
                <td className={tdClass}>
                  <span className="font-bold text-blue-600">{resident.status}</span> (02.02 ~ )
                </td>
                <th className={thClass}>생활실</th>
                <td className={tdClass}>
                  <div className="flex items-center justify-between">
                    <span>{resident.room}</span>
                    <button className={btnTiny}>변경</button>
                  </div>
                </td>
                {/* 비고: 5행과 6행을 병합하여 빈 공간 없이 채움 */}
                <th rowSpan={2} className={thClass}>
                  비고
                </th>
                <td rowSpan={2} className={clsx(tdClass, 'h-full py-2 align-top')}>
                  {resident.memo}
                </td>
              </tr>
              <tr>
                <th className={thClass}>생계급여지원</th>
                <td colSpan={3} className={tdClass}>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <span className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 text-[11px] font-medium text-gray-400">
                        식사재료비
                      </span>
                      <span className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 text-[11px] font-medium text-gray-400">
                        간식비
                      </span>
                    </div>
                    <button className={btnTiny}>생계급여지원 변경</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
