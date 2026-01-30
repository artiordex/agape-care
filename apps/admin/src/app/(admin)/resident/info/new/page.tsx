'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BasicInfoSection from './BasicInfoSection';
import GradeAdmissionSection from './GradeAdmissionSection';
import GuardianSection from './GuardianSection';
import HealthSection from './HealthSection';

import { ResidentFormData } from './types';

export default function ResidentNewPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ResidentFormData>({
    photo: '',
    name: '',
    gender: '남',
    birthDate: '',
    registrationNumber: '',
    phone: '',
    address: '',
    addressDetail: '',
    grade: '1등급',
    recognitionNumber: '',
    gradeValidUntil: '',
    copaymentRate: 20,
    status: '입소',
    room: '',
    admissionDate: '',
    mainDiseases: '',
    medications: '',
    allergies: '',
    cognition: '정상',
    mobility: '보행 가능',
    mealStatus: '자립',
    toiletStatus: '자립',
    specialNotes: '',
    guardianName: '',
    guardianRelation: '자녀',
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '',
    receiveNotice: true,
  });

  const handleInputChange = (field: keyof ResidentFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setFormData(prev => ({ ...prev, photo: '' }));
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.birthDate || !formData.phone) {
      alert('필수 항목(이름, 생년월일, 연락처)을 모두 입력해주세요.');
      return false;
    }
    if (!formData.guardianName || !formData.guardianPhone) {
      alert('보호자 정보(이름, 연락처)를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: API 연결
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('입소자 정보가 저장되었습니다.');
      router.push('/admin/resident/info');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.push('/resident/info');
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">입소자 신규등록</h1>
            <p className="mt-1 text-sm text-gray-600">새로운 입소자의 기본 정보를 입력해주세요.</p>
          </div>
          <button onClick={handleCancel} className="text-gray-400 transition-colors hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-5xl space-y-4">
          {/* 기본정보 */}
          <BasicInfoSection
            formData={formData}
            onInputChange={handleInputChange}
            onPhotoChange={handlePhotoChange}
            onPhotoRemove={handlePhotoRemove}
          />

          {/* 등급 및 입소정보 */}
          <GradeAdmissionSection formData={formData} onInputChange={handleInputChange} />

          {/* 건강 및 기능상태 */}
          <HealthSection formData={formData} onInputChange={handleInputChange} />

          {/* 보호자 정보 */}
          <GuardianSection formData={formData} onInputChange={handleInputChange} />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push('/resident/info')}
            disabled={isSubmitting}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>저장 중...
              </>
            ) : (
              <>
                <i className="ri-save-line"></i>저장
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
