'use client';

import clsx from 'clsx';

export interface Medication {
  id: string;
  name: string;
  type: string;
  dosage: string;
  unit: string;
  stock: number;
  minStock: number;
  expiryDate: string;
  manufacturer: string;
  notes: string;
}

interface Props {
  readonly medications: Medication[];
  readonly lowStockMedications: Medication[];
  readonly expiringMedications: Medication[];
  readonly onEdit: (medication: Medication) => void;
  readonly onAdd: () => void;
}

/**
 * [Component] 약품 마스터 목록 및 실시간 재고 관제 테이블
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세 레이아웃 적용
 */
export default function MedicationListTable({
  medications,
  lowStockMedications,
  expiringMedications,
  onEdit,
  onAdd,
}: Props) {
  return (
    <div className="font-sans antialiased">
      {/* 1. 실시간 재고 및 기한 경고 섹션 */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {lowStockMedications.length > 0 && (
            <div className="flex animate-pulse items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[11px] font-black text-red-700 shadow-sm">
              <i className="ri-error-warning-fill text-lg"></i>
              <span>재고 부족 경보: {lowStockMedications.length}건 감지</span>
            </div>
          )}
          {expiringMedications.length > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-[11px] font-black text-orange-700 shadow-sm">
              <i className="ri-time-fill text-lg"></i>
              <span>유효기간 임박: {expiringMedications.length}건 확인</span>
            </div>
          )}
          <div className="mx-1 hidden h-8 w-[1px] bg-gray-200 lg:block"></div>
          <span className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
            Total Inventory: <span className="text-[#5C8D5A]">{medications.length}</span> Items
          </span>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-6 py-2.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-box-line text-lg"></i>
          신규 약품 마스터 등록
        </button>
      </div>

      {/* 2. 고밀도 약품 리스트 테이블 */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 z-10 border-b border-gray-200 bg-[#f8fafc] text-[10px] font-black uppercase tracking-tighter text-gray-400">
              <tr>
                <th className="px-5 py-4">약품명 및 식별 정보</th>
                <th className="px-5 py-4">카테고리</th>
                <th className="px-5 py-4 text-center">규격/용량</th>
                <th className="px-5 py-4 text-center">현재고</th>
                <th className="px-5 py-4 text-center">안전재고</th>
                <th className="px-5 py-4">유효기간 (EXP)</th>
                <th className="px-5 py-4">제조/공급사</th>
                <th className="px-5 py-4 text-right">관제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[12px]">
              {medications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-24 text-center">
                    <div className="flex flex-col items-center justify-center opacity-30">
                      <i className="ri-medicine-bottle-line mb-3 text-5xl"></i>
                      <p className="text-[13px] font-black uppercase tracking-widest">등록된 약품 데이터가 없습니다</p>
                    </div>
                  </td>
                </tr>
              ) : (
                medications.map(medication => {
                  const isLowStock = medication.stock <= medication.minStock;
                  const isExpiring = expiringMedications.some(m => m.id === medication.id);

                  return (
                    <tr key={medication.id} className="group transition-colors hover:bg-emerald-50/30">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={clsx(
                              'flex h-8 w-8 items-center justify-center rounded-lg border text-sm transition-all',
                              isLowStock
                                ? 'border-red-100 bg-red-50 text-red-500'
                                : 'border-emerald-100 bg-emerald-50 text-[#5C8D5A]',
                            )}
                          >
                            <i className="ri-capsule-line"></i>
                          </div>
                          <div>
                            <p className="font-black tracking-tight text-gray-900">{medication.name}</p>
                            <div className="mt-1 flex gap-1.5">
                              {isLowStock && (
                                <span className="rounded bg-red-100 px-1 py-0.5 text-[9px] font-black uppercase tracking-tighter text-red-700">
                                  Low Stock
                                </span>
                              )}
                              {isExpiring && (
                                <span className="rounded bg-orange-100 px-1 py-0.5 text-[9px] font-black uppercase tracking-tighter text-orange-700">
                                  Expiring
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500">
                          {medication.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-gray-700">
                        {medication.dosage}
                        {medication.unit}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span
                          className={clsx(
                            'rounded-full px-3 py-1 font-mono text-[13px] font-black shadow-sm',
                            isLowStock
                              ? 'border border-red-100 bg-red-50 text-red-600'
                              : 'border border-emerald-100 bg-emerald-50 text-[#5C8D5A]',
                          )}
                        >
                          {medication.stock.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-gray-400">
                        {medication.minStock.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <div
                          className={clsx(
                            'flex items-center gap-2 font-mono text-[12px] font-black',
                            isExpiring ? 'text-orange-600' : 'text-gray-600',
                          )}
                        >
                          <i className="ri-calendar-event-line"></i>
                          {medication.expiryDate}
                        </div>
                      </td>
                      <td className="max-w-[120px] truncate px-5 py-4 text-[11px] font-bold text-gray-400">
                        {medication.manufacturer || '-'}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => onEdit(medication)}
                          className="rounded-lg border border-gray-200 bg-white p-2 text-gray-400 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A] hover:shadow-sm"
                        >
                          <i className="ri-edit-2-line text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. 시스템 비고 및 동기화 정보 */}
      {medications.some(m => m.notes) && (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#5C8D5A]">
            <i className="ri-information-line"></i>
            <span>Inventory Operational Notes</span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {medications
              .filter(m => m.notes)
              .map(m => (
                <div
                  key={m.id}
                  className="flex gap-2 rounded-lg border border-white/80 bg-white/60 p-2 text-[11px] font-medium text-gray-600"
                >
                  <span className="shrink-0 font-black text-[#5C8D5A]">[{m.name}]</span>
                  <span className="truncate">{m.notes}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
