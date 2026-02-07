/**
 * Description : BasicInfoTab.tsx -  📌 탭 1. 기본정보
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

interface Props {
  readonly resident: any;
}

export default function BasicInfoTab({ resident }: Props) {
  if (!resident) return null;

  // 공통 스타일 클래스 (이미지의 하늘색 헤더 및 경계선 재현)
  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-3 py-2 text-center text-[13px] font-bold text-gray-700 w-[140px]';
  const tdClass = 'border border-[#B8D1E0] px-4 py-2 text-[13px] text-gray-900 bg-white';

  return (
    <div className="space-y-8 font-sans antialiased">
      {/* 1. 기본 인적사항 섹션 */}
      <section>
        <div className="mb-2 flex items-center gap-2 font-black text-[#2E6A9E]">
          <i className="ri-id-card-line text-lg"></i>
          <h3 className="text-[15px]">기본 인적사항</h3>
        </div>
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <tbody>
            <tr>
              <th className={thClass}>수급자명</th>
              <td className={tdClass}>{resident.name}</td>
              <th className={thClass}>성별</th>
              <td className={tdClass}>{resident.gender}</td>
              <th className={thClass}>생년월일</th>
              <td className={tdClass}>{resident.birthDate}</td>
            </tr>
            <tr>
              <th className={thClass}>주민등록번호</th>
              <td className={tdClass}>{resident.registrationNumber}</td>
              <th className={thClass}>연락처</th>
              <td className={tdClass}>{resident.phone}</td>
              <th className={thClass}>생활실</th>
              <td className={tdClass}>{resident.room}</td>
            </tr>
            <tr>
              <th className={thClass}>주소</th>
              <td colSpan={5} className={tdClass}>
                {resident.address}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. 건강 및 기능 상태 섹션 */}
      <section>
        <div className="mb-2 flex items-center gap-2 font-black text-[#2E6A9E]">
          <i className="ri-heart-pulse-line text-lg"></i>
          <h3 className="text-[15px]">건강 및 기능 상태</h3>
        </div>
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <tbody>
            <tr>
              <th className={thClass}>인지기능</th>
              <td className={tdClass}>{resident.cognition}</td>
              <th className={thClass}>거동상태</th>
              <td className={tdClass}>{resident.mobility}</td>
              <th className={thClass}>식사상태</th>
              <td className={tdClass}>{resident.mealStatus}</td>
              <th className={thClass}>배변상태</th>
              <td className={tdClass}>{resident.toiletStatus}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 3. 질환 및 투약 정보 (태그 스타일) */}
      <section>
        <div className="mb-2 flex items-center gap-2 font-black text-[#2E6A9E]">
          <i className="ri-capsule-line text-lg"></i>
          <h3 className="text-[15px]">주요 질환 및 복용약품</h3>
        </div>
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <tbody>
            <tr>
              <th className={thClass}>주요 질환</th>
              <td colSpan={3} className={tdClass}>
                <div className="flex flex-wrap gap-1.5">
                  {resident.mainDiseases.map((disease: string) => (
                    <span
                      key={disease}
                      className="rounded-sm border border-red-100 bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600"
                    >
                      {disease}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th className={thClass}>복용약품</th>
              <td className={tdClass}>
                <div className="flex flex-wrap gap-1.5">
                  {resident.medications.map((med: string) => (
                    <span
                      key={med}
                      className="rounded-sm border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-600"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </td>
              <th className={thClass}>알레르기</th>
              <td className={tdClass}>
                <div className="flex flex-wrap gap-1.5">
                  {resident.allergies.map((allergy: string) => (
                    <span
                      key={allergy}
                      className="rounded-sm border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700"
                    >
                      ⚠️ {allergy}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. 특이사항 섹션 */}
      <section>
        <div className="mb-2 flex items-center gap-2 font-black text-[#2E6A9E]">
          <i className="ri-chat-history-line text-lg"></i>
          <h3 className="text-[15px]">특이사항 (관리자 비고)</h3>
        </div>
        <div className="min-h-[100px] border border-[#B8D1E0] bg-[#F8FAFC] p-4 text-[13px] leading-relaxed text-gray-700 shadow-inner">
          {resident.specialNotes || '등록된 특이사항이 없습니다.'}
        </div>
      </section>

      {/* 하단 액션 버튼 */}
      <div className="flex justify-end gap-2 border-t border-gray-200 pt-6">
        <button className="rounded border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50">
          PDF 내보내기
        </button>
        <button className="rounded bg-[#5C8D5A] px-6 py-2 text-xs font-black text-white shadow-md hover:bg-[#4A7548]">
          정보 업데이트 저장
        </button>
      </div>
    </div>
  );
}
