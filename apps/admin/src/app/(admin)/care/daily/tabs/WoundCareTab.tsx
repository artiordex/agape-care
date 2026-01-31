'use client';

import { useState } from 'react';

interface WoundCare {
  location: string;
  stage: string;
  size: { length: string; width: string; depth: string };
  appearance: string[];
  treatment: string[];
  dressing: string;
  note: string;
}

interface Props {
  care: WoundCare;
  onChange: (care: WoundCare) => void;
  onSave: () => void;
}

export default function WoundCareTab({ care, onChange, onSave }: Props) {
  const stages = ['1단계', '2단계', '3단계', '4단계', '심부조직손상', '분류불가'];
  const appearances = ['발적', '수포', '표피박리', '부종', '삼출물', '괴사조직', '육아조직'];
  const treatments = ['세척', '괴사조직제거', '소독', '드레싱교체', '압력분산', '체위변경'];

  const updateSize = (field: string, value: string) => {
    onChange({
      ...care,
      size: { ...care.size, [field]: value },
    });
  };

  const toggleAppearance = (item: string) => {
    const newAppearance = care.appearance.includes(item)
      ? care.appearance.filter(a => a !== item)
      : [...care.appearance, item];
    onChange({ ...care, appearance: newAppearance });
  };

  const toggleTreatment = (item: string) => {
    const newTreatment = care.treatment.includes(item)
      ? care.treatment.filter(t => t !== item)
      : [...care.treatment, item];
    onChange({ ...care, treatment: newTreatment });
  };

  return (
    <div className="space-y-4">
      {/* 욕창 간호 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="mb-3 text-xs font-bold text-gray-900">욕창 간호</h4>

        <div className="space-y-4">
          {/* 발생 부위 */}
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                발생 부위 <span className="text-red-600">*</span>
              </label>
              <select
                value={care.location}
                onChange={e => onChange({ ...care, location: e.target.value })}
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                <option value="천골부">천골부</option>
                <option value="미골부">미골부</option>
                <option value="좌측 둔부">좌측 둔부</option>
                <option value="우측 둔부">우측 둔부</option>
                <option value="좌측 대전자부">좌측 대전자부</option>
                <option value="우측 대전자부">우측 대전자부</option>
                <option value="좌측 발뒤꿈치">좌측 발뒤꿈치</option>
                <option value="우측 발뒤꿈치">우측 발뒤꿈치</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                욕창 단계 <span className="text-red-600">*</span>
              </label>
              <select
                value={care.stage}
                onChange={e => onChange({ ...care, stage: e.target.value })}
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                {stages.map(stage => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 크기 */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-gray-700">크기 (cm)</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  step="0.1"
                  placeholder="길이"
                  value={care.size.length}
                  onChange={e => updateSize('length', e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <div className="mt-0.5 text-[10px] text-gray-500">길이</div>
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  placeholder="너비"
                  value={care.size.width}
                  onChange={e => updateSize('width', e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <div className="mt-0.5 text-[10px] text-gray-500">너비</div>
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  placeholder="깊이"
                  value={care.size.depth}
                  onChange={e => updateSize('depth', e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <div className="mt-0.5 text-[10px] text-gray-500">깊이</div>
              </div>
            </div>
          </div>

          {/* 상태/외형 */}
          <div>
            <label className="mb-2 block text-[10px] font-medium text-gray-700">상태/외형</label>
            <div className="grid grid-cols-4 gap-2">
              {appearances.map(item => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={care.appearance.includes(item)}
                    onChange={() => toggleAppearance(item)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 처치 내용 */}
          <div>
            <label className="mb-2 block text-[10px] font-medium text-gray-700">처치 내용</label>
            <div className="grid grid-cols-3 gap-2">
              {treatments.map(item => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={care.treatment.includes(item)}
                    onChange={() => toggleTreatment(item)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 드레싱 재료 */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-gray-700">드레싱 재료</label>
            <input
              type="text"
              value={care.dressing}
              onChange={e => onChange({ ...care, dressing: e.target.value })}
              placeholder="예: 하이드로콜로이드 드레싱, 폼 드레싱"
              className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* 특이사항 */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-gray-700">특이사항</label>
            <textarea
              value={care.note}
              onChange={e => onChange({ ...care, note: e.target.value })}
              rows={3}
              placeholder="욕창 상태, 통증 정도, 주의사항 등을 기록하세요"
              className="w-full resize-none rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-2">
        <button
          onClick={onSave}
          className="rounded border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          저장
        </button>
        <button className="rounded border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          욕창 기록지 출력
        </button>
      </div>

      {/* 욕창 간호 내역 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h4 className="text-xs font-bold text-gray-900">욕창 간호 내역</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-center text-[10px] font-semibold text-gray-700">연번</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-700">일자</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-700">부위</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-700">단계</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-700">크기(cm)</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-700">처치내용</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-700">드레싱</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-700">담당자</th>
                <th className="px-3 py-2 text-center text-[10px] font-semibold text-gray-700">삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                  등록된 욕창 간호 기록이 없습니다
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export type { WoundCare };
