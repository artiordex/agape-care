import { ResidentFormData } from './types';

interface GradeAdmissionSectionProps {
  formData: ResidentFormData;
  onInputChange: (field: keyof ResidentFormData, value: any) => void;
}

export default function GradeAdmissionSection({ formData, onInputChange }: GradeAdmissionSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 등급 및 인정정보 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-gray-900">등급 및 인정정보</h3>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">요양등급</label>
              <select
                value={formData.grade}
                onChange={e => onInputChange('grade', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="1등급">1등급</option>
                <option value="2등급">2등급</option>
                <option value="3등급">3등급</option>
                <option value="4등급">4등급</option>
                <option value="5등급">5등급</option>
                <option value="인지지원등급">인지지원등급</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">인정번호</label>
              <input
                type="text"
                value={formData.recognitionNumber}
                onChange={e => onInputChange('recognitionNumber', e.target.value)}
                placeholder="인정번호"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">등급유효기간</label>
              <input
                type="date"
                value={formData.gradeValidUntil}
                onChange={e => onInputChange('gradeValidUntil', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">본인부담율 (%)</label>
              <input
                type="number"
                value={formData.copaymentRate}
                onChange={e => onInputChange('copaymentRate', parseInt(e.target.value) || 0)}
                min="0"
                max="100"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 입소정보 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-gray-900">입소정보</h3>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">입소상태</label>
              <select
                value={formData.status}
                onChange={e => onInputChange('status', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="입소">입소</option>
                <option value="대기">대기</option>
                <option value="상담">상담</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">방호실</label>
              <input
                type="text"
                value={formData.room}
                onChange={e => onInputChange('room', e.target.value)}
                placeholder="예: 101호"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">입소일</label>
              <input
                type="date"
                value={formData.admissionDate}
                onChange={e => onInputChange('admissionDate', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
