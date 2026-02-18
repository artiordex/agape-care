/**
 * Description : DailyCareInfoCards.tsx - ?? DailyCareInfoCards UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface ResidentInfo {
  name: string;
  grade: string;
  gender: string;
  age: number;
  admissionDate: string;
  room: string;
  mainDiagnosis: string;
}

interface NeedsStatus {
  physical: string;
  excretion: string;
  rehabilitation: string;
}

interface Props {
  readonly resident: ResidentInfo | null;
  readonly needsStatus: NeedsStatus;
}

/**
 * [Component] 수급자 통합 정보 및 욕구사정 요약 카드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세서 레이아웃 적용
 */
export default function DailyCareInfoCards({ resident, needsStatus }: Props) {
  // Styles
  const sectionHeaderClass = 'text-[13px] font-bold text-[#2E6A9E] mb-1 flex items-center gap-1';
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] text-[12px] font-bold text-[#333] text-center w-[80px] py-1';
  const tdClass = 'bg-white border border-[#B8D1E0] px-2 py-1 text-[12px] text-[#333]';

  if (!resident) return null;

  return (
    <div className="mb-4 flex items-start gap-4">
      {/* 1. 수급자 기본정보 (Left) */}
      <div className="flex-1">
        <div className={sectionHeaderClass}>
          <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 수급자 기본정보
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <th className={thClass}>수급자명</th>
              <td className={tdClass}>{resident.name}</td>
              <th className={thClass}>성별</th>
              <td className={tdClass}>
                {resident.gender} ({resident.age}세)
              </td>
              <th className={thClass}>생년월일</th>
              <td className={tdClass}>1930.01.05</td>
            </tr>
            <tr>
              <th className={thClass}>등급/부담률</th>
              <td className={tdClass}>{resident.grade} (20%)</td>
              <th className={thClass}>입소일</th>
              <td className={tdClass} colSpan={3}>
                {resident.admissionDate}
              </td>
            </tr>
            <tr>
              <th className={thClass}>주요질환</th>
              <td className={tdClass} colSpan={5}>
                {resident.mainDiagnosis}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. 욕구사정 (Right) */}
      <div className="w-[200px]">
        <div className={sectionHeaderClass}>
          <i className="ri-checkbox-indeterminate-line text-[10px]"></i> 욕구사정
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <th className={thClass} style={{ width: '70px' }}>
                상태 <i className="ri-question-fill text-gray-400"></i>
              </th>
              <td className={tdClass}>{needsStatus.physical}</td>
            </tr>
            <tr>
              <th className={thClass}>배설</th>
              <td className={tdClass}>{needsStatus.excretion}</td>
            </tr>
            <tr>
              <th className={thClass}>질병상태</th>
              <td className={tdClass}>{needsStatus.rehabilitation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
