/**
 * Description : CarePlanModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { AnimatePresence, motion } from 'framer-motion';

interface CarePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  resident?: any;
}

export default function CarePlanModal({ isOpen, onClose, resident }: CarePlanModalProps) {
  // UI 스타일 상수
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] text-[11px] font-bold text-[#333] text-center px-1 py-1.5';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1 bg-white text-[11px] text-[#333]';
  const tableHeadClass = 'bg-[#F2F7FB] border border-[#B8D1E0] text-[11px] font-bold text-[#555] text-center py-2';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex h-[98vh] w-full max-w-[1500px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* 상단 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-2">
              <h2 className="text-[16px] font-black text-[#333]">장기요양급여 제공 계획서 조회 (상세)</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                <i className="ri-close-line text-2xl font-bold"></i>
              </button>
            </div>

            {/* 메인 콘텐츠 영역 (스크롤) */}
            <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-4">
              {/* 1. 기본 인적 사항 및 계약 정보 [cite: 3] */}
              <section>
                <h3 className="mb-2 flex items-center text-[13px] font-bold text-[#2E6A9E]">
                  <i className="ri-user-settings-line mr-1"></i> 1. 수급자 및 기관 기본 정보
                </h3>
                <table className="w-full border-collapse border-t-2 border-[#2E6A9E]">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '10%' }}>
                        수급자명
                      </th>
                      <td className={tdClass} style={{ width: '15%' }}>
                        가나다 [cite: 3]
                      </td>
                      <th className={thClass} style={{ width: '10%' }}>
                        생년월일
                      </th>
                      <td className={tdClass} style={{ width: '15%' }}>
                        1945.01.01 [cite: 3]
                      </td>
                      <th className={thClass} style={{ width: '10%' }}>
                        전화번호
                      </th>
                      <td className={tdClass} colSpan={3}>
                        010-1234-5678 [cite: 3]
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>인정등급</th>
                      <td className={tdClass}>4등급 [cite: 3]</td>
                      <th className={thClass}>인정번호</th>
                      <td className={tdClass}>L5678910044 [cite: 3]</td>
                      <th className={thClass}>인정유효기간</th>
                      <td className={tdClass} colSpan={3}>
                        2025.12.01 ~ 2027.11.30 [cite: 3]
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>동의자(보호자)</th>
                      <td className={tdClass}>김사랑 (딸) [cite: 3]</td>
                      <th className={thClass}>보호자 연락처</th>
                      <td className={tdClass}>010-2343-1004 [cite: 3]</td>
                      <th className={thClass}>장기요양기관</th>
                      <td className={tdClass}>체험시설요양원 (12345678901) [cite: 3]</td>
                      <th className={thClass}>작성일</th>
                      <td className={tdClass}>2026.02.04 [cite: 3]</td>
                    </tr>
                    <tr>
                      <th className={thClass}>급여종류</th>
                      <td className={tdClass}>노인요양 [cite: 3]</td>
                      <th className={thClass}>계약기간</th>
                      <td className={tdClass}>2026.01.23 ~ 2031.01.22 [cite: 3]</td>
                      <th className={thClass}>계획 적용기간</th>
                      <td className={tdClass} colSpan={3}>
                        2026.02.04 ~ 2027.02.03 [cite: 3]
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 2. 종합 목표 [cite: 3] */}
              <section>
                <h3 className="mb-2 text-[13px] font-bold text-[#2E6A9E]">
                  <i className="ri-focus-3-line mr-1"></i> 2. 급여제공 목표
                </h3>
                <div className="whitespace-pre-line border border-[#B8D1E0] bg-[#F9FBFF] p-3 text-[11px] leading-relaxed text-[#444]">
                  • <strong>낙상 예방:</strong> 낙상위험도 16점(고위험). 워커/휠체어 활용, 침상 난간 관리 및 이동 시
                  주의 관찰하여 사고 예방[cite: 3].{'\n'}• <strong>욕창 예방:</strong> 욕창위험도 19점(위험없음).
                  체위변경 및 이동 시 부분 도움을 통해 피부 상태 유지[cite: 3].{'\n'}• <strong>인지/심리:</strong> 치매
                  예방약 복용 중. 인지활동 프로그램 및 말벗 서비스를 통해 심리적 안정과 생활 의욕 향상 지원[cite: 3].
                  {'\n'}• <strong>식사지원:</strong> 공동 식탁 이용 권장 및 스스로 식사하실 수 있도록 인접 보호 및 관찰
                  수행[cite: 3].
                </div>
              </section>

              {/* 3. 상세 급여제공 내용 (PDF 1~2페이지 전체 데이터)  */}
              <section>
                <h3 className="mb-2 text-[13px] font-bold text-[#2E6A9E]">
                  <i className="ri-list-check-2 mr-1"></i> 3. 세부 급여제공 계획
                </h3>
                <table className="w-full border-collapse border border-[#B8D1E0]">
                  <thead>
                    <tr>
                      <th className={tableHeadClass} style={{ width: '80px' }}>
                        필요영역
                      </th>
                      <th className={tableHeadClass} style={{ width: '120px' }}>
                        필요내용
                      </th>
                      <th className={tableHeadClass}>세부 제공내용</th>
                      <th className={tableHeadClass} style={{ width: '60px' }}>
                        횟수
                      </th>
                      <th className={tableHeadClass} style={{ width: '60px' }}>
                        시간
                      </th>
                      <th className={tableHeadClass} style={{ width: '70px' }}>
                        작성자
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        area: '신체활동',
                        need: '입을 옷 준비하기',
                        detail: '옷장, 서랍에서 옷 꺼내기 등 준비 도움 [cite: 3]',
                        freq: '일 3회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '옷 갈아입기 도움',
                        detail: '팔다리 끼우기, 끌어올리기 등 과정 도움 [cite: 3]',
                        freq: '일 3회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '옷 입고 뒷정리',
                        detail: '단추 채우기, 지퍼 잠그기, 옷 추스르기 등 [cite: 3]',
                        freq: '일 3회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '세면도구 준비',
                        detail: '대야, 비누, 수건 등 세면 도구 준비 도움 [cite: 3]',
                        freq: '일 3회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '세수하기 (전적)',
                        detail: '물수건으로 닦아주기 등 전적인 도움 제공 [cite: 3]',
                        freq: '일 3회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '양치도구 준비',
                        detail: '칫솔, 치약, 물 등 준비 도움 [cite: 3]',
                        freq: '일 3회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '양치질 지켜보기',
                        detail: '스스로 할 수 있도록 지시 및 감독 [cite: 8]',
                        freq: '일 3회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '양치질 도움',
                        detail: '치약 바르기, 칫솔질, 입 헹구기 조력 [cite: 8]',
                        freq: '일 3회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '몸 씻기 (전적)',
                        detail: '침상에서 물수건으로 몸 닦아주기 [cite: 8]',
                        freq: '일 2회',
                        time: '15분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '머리감기 (전적)',
                        detail: '침상에서 머리 감겨주기 도움 [cite: 8]',
                        freq: '일 1회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '손발톱 깎기',
                        detail: '주기적인 손발톱 정리 및 관리 [cite: 8]',
                        freq: '주 1회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '외모관리',
                        detail: '면도 도움 및 피부 보습 로션 바르기 [cite: 8]',
                        freq: '일 1회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '머리 단장',
                        detail: '머리 빗기 및 이미용 손질 도움 [cite: 8]',
                        freq: '일 1회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '식사하기 도움',
                        detail: '흡인 예방을 위한 자세 유지 및 안전 식사 조력 [cite: 8]',
                        freq: '일 3회',
                        time: '20분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '식단 관리',
                        detail: '당뇨/고혈압 등 질병에 맞는 균형 식단 제공 [cite: 8]',
                        freq: '일 3회',
                        time: '20분',
                        name: '최인경',
                      },
                      {
                        area: '기능회복',
                        need: '체위변경 지휘',
                        detail: '혼자 가능한 부분까지 지켜보고 유도 [cite: 8]',
                        freq: '일 3회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '기능회복',
                        need: '앉은 자세 유지',
                        detail: '쿠션 등 보조기구 활용한 신체 선열 유지 [cite: 8]',
                        freq: '일 3회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '신체활동',
                        need: '휠체어 이동',
                        detail: '휠체어로 옮겨 앉기 및 안전한 이동 지원 [cite: 8]',
                        freq: '일 3회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '기능회복',
                        need: '관절운동지원',
                        detail: '기능상태에 맞는 적절한 관절 가동 운동 [cite: 8]',
                        freq: '일 1회',
                        time: '10분',
                        name: '최인경',
                      },
                      {
                        area: '건강지원',
                        need: '정확한 복약',
                        detail: '시간, 용량, 용법 준수하여 약 복용 조력 [cite: 8]',
                        freq: '일 3회',
                        time: '5분',
                        name: '최인경',
                      },
                      {
                        area: '정서지원',
                        need: '의사소통 도움',
                        detail: '필담, 보청기 등 다양한 수단으로 소통 조력 [cite: 8]',
                        freq: '일 1회',
                        time: '10분',
                        name: '최인경',
                      },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className={`${tdClass} bg-[#FDFDFD] text-center font-semibold`}>{item.area}</td>
                        <td className={`${tdClass} text-center`}>{item.need}</td>
                        <td className={tdClass}>{item.detail}</td>
                        <td className={`${tdClass} text-center`}>{item.freq}</td>
                        <td className={`${tdClass} text-center`}>{item.time}</td>
                        <td className={`${tdClass} text-center text-[#2E6A9E]`}>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* 4. 기능상태 및 서비스 제공 방향 (PDF 3페이지 데이터) [cite: 11-26] */}
              <div className="grid grid-cols-2 gap-4">
                <section className="rounded border border-[#B8D1E0] p-3">
                  <h3 className="mb-2 border-b pb-1 text-[12px] font-bold text-[#333]">
                    4. 기능상태 및 환경 [cite: 11]
                  </h3>
                  <div className="space-y-2 text-[11px] text-[#666]">
                    <p>
                      • <strong>인지/소통:</strong> 한 편으로 의사소통 가능함[cite: 13].
                    </p>
                    <p>
                      • <strong>식사:</strong> 틀니 착용 중이며 밥과 다진 반찬으로 식사 수행[cite: 15].
                    </p>
                    <p>
                      • <strong>ADL:</strong> 인지/기력 저하로 인해 옷 갈아입기는 완전도움, 세안은 부분도움 필요 [cite:
                      16-19].
                    </p>
                    <p>
                      • <strong>투약:</strong> 기관 처방 약 복용 중이며 정확한 투약 관리 서비스 제공[cite: 21].
                    </p>
                  </div>
                </section>
                <section className="rounded border border-[#B8D1E0] bg-[#F9F9F9] p-3">
                  <h3 className="mb-2 border-b pb-1 text-[12px] font-bold text-[#333]">
                    5. 서비스 제공 방향 [cite: 20]
                  </h3>
                  <ul className="ml-4 list-disc space-y-1 text-[11px] text-[#666]">
                    <li>적절한 수분 섭취를 도와 배뇨/배변 문제 관리[cite: 22].</li>
                    <li>인지활동/맞춤형 프로그램을 통한 심리적 안정 지원[cite: 23].</li>
                    <li>근력 강화 및 잔존 기능 유지를 위한 규칙적인 운동 진행 [cite: 24-25].</li>
                    <li>휠체어 활용 및 안전 교육을 통한 낙상 예방[cite: 26].</li>
                  </ul>
                </section>
              </div>

              {/* 5. 개인별 장기요양 계획서와 다른 이유 [cite: 27-29] */}
              <section className="rounded border-2 border-orange-100 bg-orange-50/30 p-3">
                <h3 className="mb-1 text-[12px] font-bold text-orange-700">
                  6. 개인별장기요양이용계획서와 다른 이유 [cite: 27]
                </h3>
                <p className="text-[11px] leading-relaxed text-[#555]">
                  개인별장기요양이용계획서에는 작업치료 관련 항목이 있으나 본 기관에서 제공할 수 없어
                  <strong>물리치료(보행, 관절가동운동, 공기압 등)</strong>로 대신 서비스를 제공함 .
                </p>
              </section>

              {/* 6. 확인 및 서명  */}
              <div className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-4">
                <div className="text-[11px] text-[#888]">
                  총괄확인자: 최인경, 이슬비 [cite: 30] | 장기요양기관장: 최인경 [cite: 33]
                </div>
                <div className="text-[12px] font-bold">
                  동의자(수급자/보호자): <span className="ml-1 underline">김사랑 (서명/인) [cite: 36-37]</span>
                </div>
              </div>
            </div>

            {/* 하단 버튼 바 */}
            <div className="flex items-center justify-center gap-2 border-t border-gray-200 bg-[#F8F9FA] px-5 py-3">
              <button className="rounded bg-[#55C2C3] px-4 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-[#45B2B3]">
                계획수립 신규작성
              </button>
              <button className="rounded bg-[#55C2C3] px-4 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-[#45B2B3]">
                발송 및 전자서명
              </button>
              <button className="rounded bg-[#788CA0] px-4 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-[#687C90]">
                출력하기
              </button>
              <button
                onClick={onClose}
                className="rounded bg-[#666666] px-8 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-[#555555]"
              >
                창닫기
              </button>
            </div>
          </motion.div>

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 5px;
              border: 2px solid #f1f1f1;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #a1a1a1;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
