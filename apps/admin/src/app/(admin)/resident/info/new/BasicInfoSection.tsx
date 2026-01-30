import { ResidentFormData } from './types';

interface BasicInfoSectionProps {
  formData: ResidentFormData;
  onInputChange: (field: keyof ResidentFormData, value: any) => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoRemove: () => void;
}

export default function BasicInfoSection({
  formData,
  onInputChange,
  onPhotoChange,
  onPhotoRemove,
}: BasicInfoSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">
          기본정보 <span className="text-xs font-normal text-red-600">* 필수</span>
        </h3>
      </div>
      <div className="p-5">
        <div className="flex gap-6">
          {/* 사진 업로드 영역 */}
          <div className="flex-shrink-0">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">사진</label>
            <div className="relative">
              {formData.photo ? (
                <div className="group relative">
                  <img
                    src={formData.photo}
                    alt="입소자 사진"
                    className="h-32 w-32 rounded-lg border border-gray-200 object-cover"
                  />
                  <button
                    type="button"
                    onClick={onPhotoRemove}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                  >
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </div>
              ) : (
                <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-blue-400 hover:bg-blue-50">
                  <i className="ri-camera-line mb-2 text-2xl text-gray-400"></i>
                  <span className="text-xs text-gray-500">사진 업로드</span>
                  <span className="mt-1 text-xs text-gray-400">5MB 이하</span>
                  <input type="file" accept="image/*" onChange={onPhotoChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* 기본정보 입력 필드 */}
          <div className="grid flex-1 grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                이름 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => onInputChange('name', e.target.value)}
                placeholder="입소자 이름"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                성별 <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={e => onInputChange('gender', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="남">남</option>
                <option value="여">여</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                생년월일 <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={e => onInputChange('birthDate', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">주민등록번호</label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={e => onInputChange('registrationNumber', e.target.value)}
                placeholder="000000-0******"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                연락처 <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => onInputChange('phone', e.target.value)}
                placeholder="010-0000-0000"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-700">주소</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => onInputChange('address', e.target.value)}
                  placeholder="기본 주소"
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  검색
                </button>
              </div>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                value={formData.addressDetail}
                onChange={e => onInputChange('addressDetail', e.target.value)}
                placeholder="상세 주소"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
