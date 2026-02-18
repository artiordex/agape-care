/**
 * Description : MedicationStatus.tsx - ?? MedicationStatus UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

interface MedicationItem {
  id: number;
  name: string;
  medication: string;
  time: string;
}

interface MedicationData {
  completed: number;
  scheduled: number;
  missed: number;
  upcoming: MedicationItem[];
}

interface Props {
  readonly medications: MedicationData;
}

/**
 * [Section] 실시간 투약 통제 현황
 * 상태별 컬러 코딩 및 고밀도 타임라인 리스트 UI
 */
export default function MedicationStatus({ medications }: Props) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[12px] shadow-sm">
      {/* 섹션 헤더: Agape-Care 표준 */}
      <header className="flex items-center justify-between border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1 bg-[#5C8D5A]"></div>
          <h3 className="font-black uppercase tracking-tighter text-gray-800">일일 투약 통제</h3>
        </div>
        <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-gray-400">단위: 복용 횟수</span>
      </header>

      <div className="p-4">
        {/* 1. 투약 요약 보드 (고밀도 그리드) */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <StatMiniCard
            label="투약 완료"
            value={medications.completed}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
            borderColor="border-emerald-100"
          />
          <StatMiniCard
            label="투약 예정"
            value={medications.scheduled}
            color="text-[#5C8D5A]"
            bgColor="bg-emerald-50"
            borderColor="border-emerald-100"
          />
          <StatMiniCard
            label="투약 누락"
            value={medications.missed}
            color="text-red-600"
            bgColor="bg-red-50"
            borderColor="border-red-100"
            isAlert={medications.missed > 0}
          />
        </div>

        {/* 2. 차기 투약 예정 리스트 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
            <p className="font-black uppercase tracking-tighter text-gray-400">향후 일정</p>
            <i className="ri-time-line text-gray-300"></i>
          </div>

          <div className="max-h-[180px] space-y-1.5 overflow-y-auto pr-1">
            {medications.upcoming.length === 0 ? (
              <div className="py-8 text-center font-bold uppercase tracking-widest text-gray-300">예정된 투약 없음</div>
            ) : (
              medications.upcoming.map(item => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between rounded-sm border border-gray-100 bg-gray-50/50 p-2 transition-all hover:border-[#5C8D5A] hover:bg-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-100 bg-white text-[#5C8D5A] shadow-sm transition-colors group-hover:bg-[#5C8D5A] group-hover:text-white">
                      <i className="ri-capsule-fill text-xs"></i>
                    </div>
                    <div>
                      <p className="text-[14px] font-black leading-none text-gray-800">{item.name}</p>
                      <p className="mt-1 text-[12px] font-bold italic leading-none text-gray-400">{item.medication}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[12px] font-black tracking-tighter text-[#5C8D5A]">{item.time}</p>
                    <button className="text-[12px] font-black uppercase tracking-tighter text-gray-400 hover:text-[#5C8D5A]">
                      확인
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 하단 퀵 액션 */}
      <div className="border-t border-gray-200 bg-[#f8fafc] p-2">
        <button className="w-full rounded-sm border border-gray-300 bg-white py-1.5 text-[12px] font-black text-gray-600 transition-all hover:bg-gray-50 active:scale-[0.98]">
          <i className="ri-history-line mr-1"></i>전체 투약 기록 로그 조회
        </button>
      </div>
    </section>
  );
}

/** 내부 서브 컴포넌트: 미니 스태츠 카드 */
function StatMiniCard({ label, value, color, bgColor, borderColor, isAlert }: any) {
  return (
    <div
      className={`rounded-sm border ${borderColor} ${bgColor} p-2 text-center transition-transform hover:scale-[1.02] ${isAlert ? 'animate-pulse' : ''}`}
    >
      <p className={`text-[12px] font-black uppercase tracking-tighter ${color} opacity-70`}>{label}</p>
      <p className={`mt-0.5 font-mono text-2xl font-black leading-none ${color}`}>
        {value.toString().padStart(2, '0')}
      </p>
    </div>
  );
}
