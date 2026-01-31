'use client';

export default function HistoryDetailModal({ record, onClose }: any) {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
        <div className="flex items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-file-list-3-line text-xl opacity-70"></i>
            <h3 className="text-sm font-black uppercase tracking-widest">Care Audit Record Detail</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="custom-scrollbar max-h-[80vh] space-y-8 overflow-y-auto p-8">
          <section>
            <div className="mb-4 flex items-center gap-2 border-l-4 border-[#5C8D5A] pl-3">
              <span className="text-[13px] font-black uppercase text-gray-900">기록 기본 명세</span>
            </div>
            <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200">
              <DetailRow label="수급자명" value={record.beneficiaryName} highlight />
              <DetailRow label="생활실" value={record.room} />
              <DetailRow label="기록일자" value={record.date} />
              <DetailRow label="작성자" value={record.author} />
              <DetailRow label="기록유형" value={record.type} isBadge />
              <DetailRow label="작성상태" value={record.status} isStatusBadge />
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2 border-l-4 border-[#5C8D5A] pl-3">
              <span className="text-[13px] font-black uppercase text-gray-900">상세 기록 내용</span>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-[12px] font-medium leading-loose text-gray-700 shadow-inner">
              {record.summary}
              {'\n\n[System Log]\n본 데이터는 장기요양 지침에 의거하여 위변조 방지 처리되었습니다.'}
            </div>
          </section>
        </div>

        <div className="flex justify-center gap-2 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button className="flex-1 rounded-lg bg-[#5C8D5A] py-3 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548]">
            기록지 인쇄하기
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-[12px] font-black text-gray-600 transition-all hover:bg-gray-100"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, highlight, isBadge, isStatusBadge }: any) {
  return (
    <div className="flex border-b border-gray-100 last:border-b-0">
      <div className="w-28 shrink-0 border-r border-gray-100 bg-[#f8fafc] px-4 py-3 text-[10px] font-black uppercase italic tracking-tighter text-gray-400">
        {label}
      </div>
      <div className="flex flex-1 items-center px-4 py-3 text-[12px] font-bold">
        {isStatusBadge ? (
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] text-[#5C8D5A]">
            {value}
          </span>
        ) : (
          <span className={highlight ? 'font-black text-[#5C8D5A]' : 'text-gray-800'}>{value}</span>
        )}
      </div>
    </div>
  );
}
