/**
 * Description : BasicInfoTab.tsx - ?? ? UI ????
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
  // 공통 스타일 클래스 (Grid Layout)
  const labelClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 flex items-center justify-center text-[13px] font-bold text-gray-700';
  const dataClass = 'border border-[#B8D1E0] bg-white px-3 py-1.5 flex items-center text-[13px] text-gray-900';
  const tagClass = (color: string) =>
    `ml-1 rounded-[2px] border px-1 text-[11px] font-bold ${
      color === 'green'
        ? 'border-green-600 text-green-700'
        : color === 'blue'
          ? 'border-blue-600 text-blue-700'
          : 'border-gray-400 text-gray-500'
    }`;

  return (
    <div className="space-y-8 font-sans antialiased">
      {/* 1. 기본 인적사항 섹션 */}
      <section>
        <div className="mb-2 flex items-center justify-between font-black text-[#2E6A9E]">
          <div className="flex items-center gap-2">
            <i className="ri-id-card-line text-lg"></i>
            <h3 className="text-[15px]">기본 인적사항</h3>
          </div>
          <button className="rounded bg-[#5C8D5A] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#4A7548]">
            기본 정보 수정
          </button>
        </div>
        <div className="grid border-collapse grid-cols-12 border border-[#B8D1E0]">
          {/* Row 1 */}
          <div className={`${labelClass} col-span-2`}>수급자명</div>
          <div className={`${dataClass} col-span-2`}>{resident.name}</div>
          <div className={`${labelClass} col-span-2`}>성별</div>
          <div className={`${dataClass} col-span-2`}>{resident.gender}</div>
          <div className={`${labelClass} col-span-2`}>생년월일</div>
          <div className={`${dataClass} col-span-2`}>{resident.birthDate}</div>

          {/* Row 2 */}
          <div className={`${labelClass} col-span-2`}>주민등록번호</div>
          <div className={`${dataClass} col-span-2`}>{resident.registrationNumber}</div>
          <div className={`${labelClass} col-span-2`}>연락처</div>
          <div className={`${dataClass} col-span-2`}>{resident.phone}</div>
          <div className={`${labelClass} col-span-2`}>생활실</div>
          <div className={`${dataClass} col-span-2`}>{resident.room}</div>

          {/* Row 3 */}
          <div className={`${labelClass} col-span-2`}>주소</div>
          <div className={`${dataClass} col-span-10`}>{resident.address}</div>
        </div>
      </section>

      {/* 2. 보호자 정보 섹션 (New) */}
      <section>
        <div className="mb-2 flex items-center justify-between font-black text-[#2E6A9E]">
          <div className="flex items-center gap-2">
            <i className="ri-shield-user-line text-lg"></i>
            <h3 className="text-[15px]">보호자 정보</h3>
          </div>
          <button className="rounded bg-[#5C8D5A] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#4A7548]">
            보호자 정보 수정
          </button>
        </div>
        <div className="grid border-collapse grid-cols-12 border border-[#B8D1E0]">
          {/* Row 1 */}
          <div className={`${labelClass} col-span-2`}>
            보호자명
            <br />
            (주보호자)
          </div>
          <div className={`${dataClass} col-span-2`}>{resident.guardianName || '김가나'}</div>
          <div className={`${labelClass} col-span-2`}>관계</div>
          <div className={`${dataClass} col-span-2`}>{resident.guardianRelation || '딸'}</div>
          <div className={`${labelClass} col-span-2`}>휴대폰</div>
          <div className={`${dataClass} col-span-2`}>
            {resident.guardianPhone || '010-2345-6789'}
            <span className={tagClass('green')}>급여</span>
            <span className={tagClass('green')}>청구</span>
          </div>

          {/* Row 2 */}
          <div className={`${labelClass} col-span-2`}>생년월일</div>
          <div className={`${dataClass} col-span-2`}>{resident.guardianBirth || '1960.01.01'}</div>
          <div className={`${labelClass} col-span-2`}>전화번호</div>
          <div className={`${dataClass} col-span-2`}>{resident.guardianTel}</div>
          <div className={`${labelClass} col-span-2`}>이메일</div>
          <div className={`${dataClass} col-span-2`}>{resident.guardianEmail}</div>

          {/* Row 3 */}
          <div className={`${labelClass} col-span-2`}>청구지주소</div>
          <div className={`${dataClass} col-span-6`}>
            {resident.billingAddress || '(10364) 경기 고양시 일산동구 장항동 745 1동 202호'}
          </div>
          <div className={`${labelClass} col-span-2`}>청구서수신</div>
          <div className={`${dataClass} col-span-2 gap-1`}>
            <span className={tagClass('green')}>문자,알림톡</span>
            <span className={tagClass('gray')}>이메일</span>
            <span className={tagClass('gray')}>우편</span>
          </div>

          {/* Family 1 */}
          <div className={`${labelClass} col-span-1`}>가족이름1</div>
          <div className={`${dataClass} col-span-2`}></div>
          <div className={`${labelClass} col-span-1`}>관계1</div>
          <div className={`${dataClass} col-span-2`}></div>
          <div className={`${labelClass} col-span-1`}>휴대폰1</div>
          <div className={`${dataClass} col-span-2`}></div>

          {/* Memo - Placed at 7th Column slot (Right side), spans 2 rows */}
          <div className={`${labelClass} col-span-1 row-span-2 items-start pt-2`}>비고</div>
          <div className={`${dataClass} col-span-2 row-span-2 h-auto items-start pt-2`}></div>

          {/* Family 2 */}
          <div className={`${labelClass} col-span-1`}>가족이름2</div>
          <div className={`${dataClass} col-span-2`}></div>
          <div className={`${labelClass} col-span-1`}>관계2</div>
          <div className={`${dataClass} col-span-2`}></div>
          <div className={`${labelClass} col-span-1`}>휴대폰2</div>
          <div className={`${dataClass} col-span-2`}></div>
        </div>
      </section>

      {/* 3. 건강 및 기능 상태 섹션 */}
      <section>
        <div className="mb-2 flex items-center justify-between font-black text-[#2E6A9E]">
          <div className="flex items-center gap-2">
            <i className="ri-heart-pulse-line text-lg"></i>
            <h3 className="text-[15px]">건강 및 기능 상태</h3>
          </div>
        </div>
        <div className="grid border-collapse grid-cols-12 border border-[#B8D1E0]">
          <div className={`${labelClass} col-span-2`}>인지기능</div>
          <div className={`${dataClass} col-span-1`}>{resident.cognition}</div>
          <div className={`${labelClass} col-span-2`}>거동상태</div>
          <div className={`${dataClass} col-span-1`}>{resident.mobility}</div>
          <div className={`${labelClass} col-span-2`}>식사상태</div>
          <div className={`${dataClass} col-span-1`}>{resident.mealStatus}</div>
          <div className={`${labelClass} col-span-2`}>배변상태</div>
          <div className={`${dataClass} col-span-1`}>{resident.toiletStatus}</div>
        </div>
      </section>

      {/* 4. 입소/퇴소 이력 섹션 (New) */}
      <section>
        <div className="mb-2 flex items-center justify-between font-black text-[#2E6A9E]">
          <div className="flex items-center gap-2">
            <i className="ri-history-line text-lg"></i>
            <h3 className="text-[15px]">수급자 입소/퇴소 이력</h3>
          </div>
          <button className="rounded bg-[#5C8D5A] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#4A7548]">
            입소/퇴소 이력 수정
          </button>
        </div>
        <div className="overflow-hidden border border-[#B8D1E0]">
          <table className="w-full text-[13px] text-gray-700">
            <thead className="bg-[#E8F1F8] font-bold text-gray-800">
              <tr>
                <th className="border-b border-r border-[#B8D1E0] py-1 text-center" rowSpan={2}>
                  연번
                </th>
                <th className="border-b border-[#B8D1E0] py-1 text-center" colSpan={4}>
                  입소/퇴소 정보
                </th>
                <th className="border-b border-l border-[#B8D1E0] py-1 text-center" rowSpan={2}>
                  퇴소정산
                </th>
                <th className="border-b border-l border-[#B8D1E0] py-1 text-center" colSpan={4}>
                  연계기록지 정보
                </th>
              </tr>
              <tr>
                <th className="border-b border-l border-r border-[#B8D1E0] py-1 text-center">구분</th>
                <th className="border-b border-r border-[#B8D1E0] py-1 text-center">일자</th>
                <th className="border-b border-r border-[#B8D1E0] py-1 text-center">시간</th>
                <th className="border-b border-[#B8D1E0] py-1 text-center">퇴소사유</th>
                <th className="border-b border-l border-r border-[#B8D1E0] py-1 text-center">작성일</th>
                <th className="border-b border-r border-[#B8D1E0] py-1 text-center">연계사유</th>
                <th className="border-b border-r border-[#B8D1E0] py-1 text-center">제공여부</th>
                <th className="border-b border-[#B8D1E0] py-1 text-center">조회</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center">1</td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center">최초입소</td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center">
                  {resident.admissionDate || '2026.01.23'}
                </td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center">{resident.admissionTime || '11:55'}</td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center"></td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center">-</td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center"></td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center"></td>
                <td className="border-r border-[#B8D1E0] py-1.5 text-center">-</td>
                <td className="py-1.5 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 하단 액션 버튼 그룹 */}
      <div className="mt-8 flex gap-2">
        <button className="rounded bg-[#5C8D5A] px-4 py-2 text-xs font-bold text-white hover:bg-[#4A7548]">
          퇴소 처리
          <br />
          (연계기록지 작성)
        </button>
        <button className="rounded bg-[#5C8D5A] px-4 py-2 text-xs font-bold text-white hover:bg-[#4A7548]">
          처방전 대리수령 신청서
          <br />
          미작성
        </button>
        <button className="rounded bg-gray-500 px-4 py-2 text-xs font-bold text-white hover:bg-gray-600">
          수급자 정보 출력
        </button>
        <button className="rounded bg-gray-500 px-4 py-2 text-xs font-bold text-white hover:bg-gray-600">
          안내표지 부착 출력
        </button>
        <button className="rounded bg-gray-500 px-4 py-2 text-xs font-bold text-white hover:bg-gray-600">
          입소사실 확인서 출력
        </button>
        <button className="rounded bg-gray-500 px-4 py-2 text-xs font-bold text-white hover:bg-gray-600">
          요양급여수가 변경안내 출력
          <br />
          2026년
        </button>
      </div>
    </div>
  );
}
