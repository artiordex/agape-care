/**
 * Description : NursingCareTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import React from 'react';

export interface NursingCareNote {
  writer: string; // 작성자

  // 호흡기 간호
  respiratory: {
    suction: boolean; // 흡인실시
    humidifier: boolean; // 가습기
    nebulizer: boolean; // 네브라이져 제공
    oxygen: boolean; // 산소공급
    etc: boolean; // 기타
    etcDetail: string; // 기타 상세
  };

  // 피부 간호
  skin: {
    woundCare: boolean; // 외상처치
    dressing: boolean; // 붕대교환
    ointment: boolean; // 연고바르기
    medicatedBath: boolean; // 약욕제공
    etc: boolean; // 기타
    etcDetail: string;
  };

  // 통증 간호
  pain: {
    compress: boolean; // 온/냉습포 제공 (Combined)
    etc: boolean; // 기타
    etcDetail: string;
  };

  // 응급서비스
  emergency: {
    unconscious: boolean; // 의식소실
    dyspnea: boolean; // 호흡곤란
    bleeding: boolean; // 출혈 또는 외상
    choking: boolean; // 질식(기도폐쇄)
    seizure: boolean; // 경련
    burn: boolean; // 화상
    fall: boolean; // 낙상
    cardiacArrest: boolean; // 심장(심정지)
    stroke: boolean; // 뇌졸중
    etc: boolean; // 기타
    etcDetail: string;
  };

  // 원내 접종
  vaccination: {
    flu: boolean; // 독감
    pneumonia: boolean; // 폐렴
    covid: boolean; // 코로나
    covidRound: string; // 차수
    etc: boolean; // 기타
    etcDetail: string;
  };

  // 그 밖의 처치
  otherTreatment: {
    dialysis: boolean; // 복막투석
    tracheostomy: boolean; // 기관절개관 간호
    criticalCare: boolean; // 위독시 간호
    etc: boolean; // 기타
    etcDetail: string;
  };

  // 상세 처치 내역
  detailNote: string;
}

interface Props {
  readonly note: NursingCareNote;
  readonly onChange: (note: NursingCareNote) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 8. 간호처치
 * Legacy UI Style (Blue/Gray Theme) matching the screenshot
 */
export default function NursingCareTab({ note, onChange, onSave }: Props) {
  const updateNote = (path: string, value: any) => {
    // path example: 'respiratory.suction' or 'detailNote'
    const keys = path.split('.');
    if (keys.length === 1) {
      onChange({ ...note, [keys[0]]: value });
    } else if (keys.length === 2) {
      const mainKey = keys[0] as keyof NursingCareNote;
      // @ts-ignore - dynamic object access
      const subObject = { ...note[mainKey] };
      subObject[keys[1]] = value;
      onChange({ ...note, [mainKey]: subObject });
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#333] antialiased">
      {/* 1. 간호처치 메인 폼 */}
      <div className="flex flex-col border border-[#B8D1E0] bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <div className="flex items-center gap-1 text-[13px] font-bold">
            <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
            <span className="text-[#204987]">간호처치</span>
          </div>
          <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
            전일 자료 조회
          </button>
        </div>

        {/* Form Body */}
        <div className="flex flex-col">
          {/* 작성자 */}
          <div className="flex border-b border-[#B8D1E0]">
            <div className="flex w-[120px] shrink-0 items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center text-[12px] font-bold text-[#333]">
              작성자
            </div>
            <div className="flex flex-1 items-center gap-1 p-2">
              <input
                type="text"
                readOnly
                value={note.writer}
                className="w-[120px] border border-gray-300 px-2 py-1 text-[12px] outline-none"
              />
              <button className="rounded-sm bg-[#546E7A] px-2 py-1 text-[11px] font-bold text-white hover:bg-[#455A64]">
                선택
              </button>
            </div>
          </div>

          {/* 호흡기 간호 */}
          <GroupRow title="호흡기간호">
            <Checkbox
              label="흡인실시"
              checked={note.respiratory.suction}
              onChange={() => updateNote('respiratory.suction', !note.respiratory.suction)}
            />
            <Checkbox
              label="가습기"
              checked={note.respiratory.humidifier}
              onChange={() => updateNote('respiratory.humidifier', !note.respiratory.humidifier)}
            />
            <Checkbox
              label="네브라이져 제공"
              checked={note.respiratory.nebulizer}
              onChange={() => updateNote('respiratory.nebulizer', !note.respiratory.nebulizer)}
            />
            <Checkbox
              label="산소공급"
              checked={note.respiratory.oxygen}
              onChange={() => updateNote('respiratory.oxygen', !note.respiratory.oxygen)}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                label="기타"
                checked={note.respiratory.etc}
                onChange={() => updateNote('respiratory.etc', !note.respiratory.etc)}
              />
              <input
                type="text"
                disabled={!note.respiratory.etc}
                value={note.respiratory.etcDetail}
                onChange={e => updateNote('respiratory.etcDetail', e.target.value)}
                className="w-[100px] border border-gray-300 px-2 py-0.5 text-[12px] outline-none disabled:bg-gray-50"
              />
            </div>
          </GroupRow>

          {/* 피부 간호 */}
          <GroupRow title="피부간호">
            <Checkbox
              label="외상처치"
              checked={note.skin.woundCare}
              onChange={() => updateNote('skin.woundCare', !note.skin.woundCare)}
            />
            <Checkbox
              label="붕대교환"
              checked={note.skin.dressing}
              onChange={() => updateNote('skin.dressing', !note.skin.dressing)}
            />
            <Checkbox
              label="연고 바르기"
              checked={note.skin.ointment}
              onChange={() => updateNote('skin.ointment', !note.skin.ointment)}
            />
            <Checkbox
              label="약욕 제공"
              checked={note.skin.medicatedBath}
              onChange={() => updateNote('skin.medicatedBath', !note.skin.medicatedBath)}
            />
            <div className="flex items-center gap-2">
              <Checkbox label="기타" checked={note.skin.etc} onChange={() => updateNote('skin.etc', !note.skin.etc)} />
              <input
                type="text"
                disabled={!note.skin.etc}
                value={note.skin.etcDetail}
                onChange={e => updateNote('skin.etcDetail', e.target.value)}
                className="w-[100px] border border-gray-300 px-2 py-0.5 text-[12px] outline-none disabled:bg-gray-50"
              />
            </div>
          </GroupRow>

          {/* 통증 간호 */}
          <GroupRow title="통증간호">
            <Checkbox
              label="온·냉습포 제공"
              checked={note.pain.compress}
              onChange={() => updateNote('pain.compress', !note.pain.compress)}
            />
            <div className="flex items-center gap-2">
              <Checkbox label="기타" checked={note.pain.etc} onChange={() => updateNote('pain.etc', !note.pain.etc)} />
              <input
                type="text"
                disabled={!note.pain.etc}
                value={note.pain.etcDetail}
                onChange={e => updateNote('pain.etcDetail', e.target.value)}
                className="w-[100px] border border-gray-300 px-2 py-0.5 text-[12px] outline-none disabled:bg-gray-50"
              />
            </div>
          </GroupRow>

          {/* 응급서비스 */}
          <GroupRow title="응급서비스">
            <Checkbox
              label="의식소실"
              checked={note.emergency.unconscious}
              onChange={() => updateNote('emergency.unconscious', !note.emergency.unconscious)}
            />
            <Checkbox
              label="호흡곤란"
              checked={note.emergency.dyspnea}
              onChange={() => updateNote('emergency.dyspnea', !note.emergency.dyspnea)}
            />
            <Checkbox
              label="출혈 또는 외상"
              checked={note.emergency.bleeding}
              onChange={() => updateNote('emergency.bleeding', !note.emergency.bleeding)}
            />
            <Checkbox
              label="질식(기도폐쇄)"
              checked={note.emergency.choking}
              onChange={() => updateNote('emergency.choking', !note.emergency.choking)}
            />
            <Checkbox
              label="경련"
              checked={note.emergency.seizure}
              onChange={() => updateNote('emergency.seizure', !note.emergency.seizure)}
            />
            <Checkbox
              label="화상"
              checked={note.emergency.burn}
              onChange={() => updateNote('emergency.burn', !note.emergency.burn)}
            />
            <Checkbox
              label="낙상"
              checked={note.emergency.fall}
              onChange={() => updateNote('emergency.fall', !note.emergency.fall)}
            />
            <Checkbox
              label="심장(심정지)"
              checked={note.emergency.cardiacArrest}
              onChange={() => updateNote('emergency.cardiacArrest', !note.emergency.cardiacArrest)}
            />
            <Checkbox
              label="뇌졸중"
              checked={note.emergency.stroke}
              onChange={() => updateNote('emergency.stroke', !note.emergency.stroke)}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                label="기타"
                checked={note.emergency.etc}
                onChange={() => updateNote('emergency.etc', !note.emergency.etc)}
              />
              <input
                type="text"
                disabled={!note.emergency.etc}
                value={note.emergency.etcDetail}
                onChange={e => updateNote('emergency.etcDetail', e.target.value)}
                className="w-[100px] border border-gray-300 px-2 py-0.5 text-[12px] outline-none disabled:bg-gray-50"
              />
            </div>
          </GroupRow>

          {/* 원내 접종 */}
          <GroupRow title="원내 접종">
            <Checkbox
              label="독감"
              checked={note.vaccination.flu}
              onChange={() => updateNote('vaccination.flu', !note.vaccination.flu)}
            />
            <Checkbox
              label="폐렴"
              checked={note.vaccination.pneumonia}
              onChange={() => updateNote('vaccination.pneumonia', !note.vaccination.pneumonia)}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                label="코로나"
                checked={note.vaccination.covid}
                onChange={() => updateNote('vaccination.covid', !note.vaccination.covid)}
              />
              <input
                type="text"
                placeholder="차수"
                disabled={!note.vaccination.covid}
                value={note.vaccination.covidRound}
                onChange={e => updateNote('vaccination.covidRound', e.target.value)}
                className="w-[60px] border border-gray-300 px-2 py-0.5 text-[12px] outline-none disabled:bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                label="기타"
                checked={note.vaccination.etc}
                onChange={() => updateNote('vaccination.etc', !note.vaccination.etc)}
              />
              <input
                type="text"
                disabled={!note.vaccination.etc}
                value={note.vaccination.etcDetail}
                onChange={e => updateNote('vaccination.etcDetail', e.target.value)}
                className="w-[100px] border border-gray-300 px-2 py-0.5 text-[12px] outline-none disabled:bg-gray-50"
              />
            </div>
          </GroupRow>

          {/* 그 밖의 처치 */}
          <GroupRow title="그 밖의 처치">
            <Checkbox
              label="복막투석"
              checked={note.otherTreatment.dialysis}
              onChange={() => updateNote('otherTreatment.dialysis', !note.otherTreatment.dialysis)}
            />
            <Checkbox
              label="기관절개관 간호"
              checked={note.otherTreatment.tracheostomy}
              onChange={() => updateNote('otherTreatment.tracheostomy', !note.otherTreatment.tracheostomy)}
            />
            <Checkbox
              label="위독시 간호"
              checked={note.otherTreatment.criticalCare}
              onChange={() => updateNote('otherTreatment.criticalCare', !note.otherTreatment.criticalCare)}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                label="기타"
                checked={note.otherTreatment.etc}
                onChange={() => updateNote('otherTreatment.etc', !note.otherTreatment.etc)}
              />
              <input
                type="text"
                disabled={!note.otherTreatment.etc}
                value={note.otherTreatment.etcDetail}
                onChange={e => updateNote('otherTreatment.etcDetail', e.target.value)}
                className="w-[100px] border border-gray-300 px-2 py-0.5 text-[12px] outline-none disabled:bg-gray-50"
              />
            </div>
          </GroupRow>

          {/* 상세 처치 내역 */}
          <div className="flex">
            <div className="flex w-[120px] shrink-0 items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center text-[12px] font-bold text-[#333]">
              상세 처치 내역
            </div>
            <div className="flex-1 p-2">
              <textarea
                value={note.detailNote}
                onChange={e => updateNote('detailNote', e.target.value)}
                className="h-[80px] w-full resize-none border border-gray-300 p-2 text-[12px] outline-none focus:border-[#204987]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-center gap-2 py-4">
        <button
          onClick={onSave}
          className="rounded bg-[#2980b9] px-16 py-2 text-[14px] font-bold text-white shadow-md transition-colors hover:bg-[#2066aa]"
        >
          저장
        </button>
        <button className="flex flex-col items-center justify-center rounded bg-[#7f8c8d] px-6 py-1 text-white shadow-md transition-colors hover:bg-[#636e72]">
          <span className="text-[13px] font-bold">간호처치 기록지 출력</span>
          <span className="text-[10px] opacity-90">2026.02.01 - 2026.02.28</span>
        </button>
      </div>

      {/* 2. 하단 리스트: 간호처치 내역 */}
      <div className="overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
          <h3 className="text-[13px] font-bold text-[#204987]">간호처치 내역</h3>
        </div>
        <div className="min-h-[250px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-[#B8D1E0] bg-[#E8F1F8] text-center text-[11px] font-bold text-[#333]">
              <tr>
                <th className="w-[60px] border-r border-[#B8D1E0] py-2">연번</th>
                <th className="w-[100px] border-r border-[#B8D1E0] py-2">작성일</th>
                <th className="border-r border-[#B8D1E0] py-2">내용</th>
                <th className="w-[200px] border-r border-[#B8D1E0] py-2">상세처치내역</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">담당자</th>
                <th className="w-[60px] py-2">삭제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-center text-[12px]">
              <tr>
                <td colSpan={6} className="py-20 text-gray-500">
                  조회된 간호처치 목록이 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GroupRow({
  title,
  children,
  isLast,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly isLast?: boolean;
}) {
  return (
    <div className={clsx('flex', !isLast && 'border-b border-[#B8D1E0]')}>
      <div className="flex w-[120px] shrink-0 items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center text-[12px] font-bold text-[#333]">
        {title}
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 p-2">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5 hover:opacity-80">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 rounded border-gray-300 text-[#204987] focus:ring-[#204987]"
      />
      <span className="text-[12px] font-medium text-[#555]">{label}</span>
    </label>
  );
}
