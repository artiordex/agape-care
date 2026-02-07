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

  // th: 제목 셀 (배경색 및 너비 고정)
  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[13px] font-bold text-gray-700 w-[120px] shrink-0';
  // td: 데이터 셀 (격자 밀착)
  const tdClass = 'border border-[#B8D1E0] px-3 py-1.5 text-[13px] text-gray-900';
  // 버튼 스타일
  const btnTiny =
    'rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-normal text-gray-600 hover:bg-gray-50 shrink-0 ml-2';

  return (
    <div className="w-full bg-white font-sans antialiased">
      {/* 메인 컨테이너: 사진 섹션과 표 섹션을 하나의 border-collapse로 묶음 */}
      <div className="flex w-full border-collapse border border-[#B8D1E0]">
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
