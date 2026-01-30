'use client';

import { api } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BasicInfoSection from '../../new/BasicInfoSection';
import GradeAdmissionSection from '../../new/GradeAdmissionSection';
import GuardianSection from '../../new/GuardianSection';
import HealthSection from '../../new/HealthSection';
import { ResidentFormData } from '../../new/types';

export default function ResidentEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

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

  // Fetch resident data
  const { data: residentData, isLoading } = api.resident.getResident.useQuery(
    ['resident', id],
    {
      params: { id },
    },
    {
      enabled: !!id,
    },
  );

  // Update mutation
  const updateMutation = api.resident.updateResident.useMutation();

  useEffect(() => {
    if (residentData?.status === 200) {
      const data = residentData.body;
      setFormData({
        photo: data.photo || '',
        name: data.name,
        gender: data.gender,
        birthDate: data.birthDate,
        registrationNumber: data.registrationNumber,
        phone: data.phone,
        address: data.address,
        addressDetail: '', // 상세주소 분리 필요시 로직 추가
        grade: data.grade,
        recognitionNumber: data.recognitionNumber || '',
        gradeValidUntil: data.gradeValidUntil,
        copaymentRate: data.copaymentRate,
        status: data.status,
        room: data.room || '',
        admissionDate: data.admissionDate,
        mainDiseases: data.mainDiseases.join(', '),
        medications: data.medications.join(', '),
        allergies: data.allergies.join(', '),
        cognition: data.cognition,
        mobility: data.mobility,
        mealStatus: data.mealStatus,
        toiletStatus: data.toiletStatus,
        specialNotes: data.specialNotes || '',
        guardianName: data.guardians[0]?.name || '',
        guardianRelation: data.guardians[0]?.relation || '',
        guardianPhone: data.guardians[0]?.phone || '',
        guardianEmail: data.guardians[0]?.email || '',
        guardianAddress: data.guardians[0]?.address || '',
        receiveNotice: data.guardians[0]?.receiveNotice ?? true,
      });
    }
  }, [residentData]);

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
      await updateMutation.mutateAsync({
        params: { id },
        body: {
          name: formData.name,
          photo: formData.photo,
          gender: formData.gender,
          birthDate: formData.birthDate,
          registrationNumber: formData.registrationNumber,
          phone: formData.phone,
          address: formData.address, // 상세주소 합치기 로직 필요시 수정
          grade: formData.grade,
          recognitionNumber: formData.recognitionNumber,
          gradeValidUntil: formData.gradeValidUntil,
          copaymentRate: formData.copaymentRate,
          status: formData.status as any,
          room: formData.room,
          admissionDate: formData.admissionDate,
          mainDiseases: formData.mainDiseases
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
          medications: formData.medications
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
          allergies: formData.allergies
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
          cognition: formData.cognition,
          mobility: formData.mobility,
          mealStatus: formData.mealStatus,
          toiletStatus: formData.toiletStatus,
          specialNotes: formData.specialNotes,
          guardians: [
            {
              name: formData.guardianName,
              relation: formData.guardianRelation,
              phone: formData.guardianPhone,
              email: formData.guardianEmail,
              address: formData.guardianAddress,
              receiveNotice: formData.receiveNotice,
            },
          ],
        },
      });

      alert('입소자 정보가 수정되었습니다.');
      router.back();
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-loader-4-line animate-spin text-3xl text-blue-600"></i>
          <p className="mt-2 text-sm text-gray-600">정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    if (confirm('수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.back();
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">입소자 정보 수정</h1>
            <p className="mt-1 text-sm text-gray-600">입소자의 정보를 수정합니다.</p>
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
            onClick={handleCancel}
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
