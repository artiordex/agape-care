import { ResidentFormData } from './types';

interface GuardianSectionProps {
  readonly formData: ResidentFormData;
  readonly onInputChange: (field: keyof ResidentFormData, value: any) => void;
}

export default function GuardianSection({ formData, onInputChange }: GuardianSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">
          보호자 정보 <span className="text-xs font-normal text-red-600">* 필수</span>
        </h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              보호자 이름 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.guardianName}
              onChange={e => onInputChange('guardianName', e.target.value)}
              placeholder="보호자 이름"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">관계</label>
            <select
              value={formData.guardianRelation}
              onChange={e => onInputChange('guardianRelation', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="자녀">자녀</option>
              <option value="배우자">배우자</option>
              <option value="형제자매">형제자매</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              연락처 <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              value={formData.guardianPhone}
              onChange={e => onInputChange('guardianPhone', e.target.value)}
              placeholder="010-0000-0000"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">이메일</label>
            <input
              type="email"
              value={formData.guardianEmail}
              onChange={e => onInputChange('guardianEmail', e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.receiveNotice}
                onChange={e => onInputChange('receiveNotice', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">청구서 수신</span>
            </label>
          </div>
          <div className="col-span-3">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">청구지 주소</label>
            <input
              type="text"
              value={formData.guardianAddress}
              onChange={e => onInputChange('guardianAddress', e.target.value)}
              placeholder="청구서를 받을 주소"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
