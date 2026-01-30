import { ResidentFormData } from './types';

interface HealthSectionProps {
  formData: ResidentFormData;
  onInputChange: (field: keyof ResidentFormData, value: any) => void;
}

export default function HealthSection({ formData, onInputChange }: HealthSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">건강 및 기능상태</h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">인지기능</label>
            <select
              value={formData.cognition}
              onChange={e => onInputChange('cognition', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="정상">정상</option>
              <option value="경도 인지저하">경도 인지저하</option>
              <option value="중등도 인지저하">중등도 인지저하</option>
              <option value="중증 인지저하">중증 인지저하</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">거동상태</label>
            <select
              value={formData.mobility}
              onChange={e => onInputChange('mobility', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="보행 가능">보행 가능</option>
              <option value="보행기">보행기</option>
              <option value="휠체어">휠체어</option>
              <option value="침상">침상</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">식사상태</label>
            <select
              value={formData.mealStatus}
              onChange={e => onInputChange('mealStatus', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="자립">자립</option>
              <option value="부분 도움">부분 도움</option>
              <option value="전적 도움">전적 도움</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">배변상태</label>
            <select
              value={formData.toiletStatus}
              onChange={e => onInputChange('toiletStatus', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="자립">자립</option>
              <option value="부분 도움">부분 도움</option>
              <option value="기저귀 사용">기저귀 사용</option>
            </select>
          </div>
          <div className="col-span-4">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">주요 질환 (쉼표로 구분)</label>
            <input
              type="text"
              value={formData.mainDiseases}
              onChange={e => onInputChange('mainDiseases', e.target.value)}
              placeholder="예: 고혈압, 당뇨, 치매"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">복용약품 (쉼표로 구분)</label>
            <input
              type="text"
              value={formData.medications}
              onChange={e => onInputChange('medications', e.target.value)}
              placeholder="예: 혈압약, 당뇨약"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">알레르기 (쉼표로 구분)</label>
            <input
              type="text"
              value={formData.allergies}
              onChange={e => onInputChange('allergies', e.target.value)}
              placeholder="예: 페니실린"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-4">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">특이사항</label>
            <textarea
              value={formData.specialNotes}
              onChange={e => onInputChange('specialNotes', e.target.value)}
              placeholder="특이사항을 입력하세요"
              rows={3}
              className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
