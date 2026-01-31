'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface UserInfo {
  name: string;
  role: string;
  employeeId: string;
  roleLevel: string;
  phone: string;
  email: string;
  avatar: string;
}

interface Props {
  readonly userInfo: UserInfo;
}

/**
 * [Component] 개인 인사 정보 조회 및 보안 프로토콜 설정 통합 탭
 * 아가페 그린(#5C8D5A) 테마 및 직각형 고밀도 레이아웃 적용
 */
export default function SettingsTab({ userInfo }: Props) {
  // 1. 상태 및 폼 제어
  const [contactInfo, setContactInfo] = useState({ phone: userInfo.phone, email: userInfo.email });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 2. 보안 유틸리티: IP 마스킹
  const maskIP = (ip: string) => {
    const parts = ip.split('.');
    return parts.length === 4 ? `${parts[0]}.${parts[1]}.***.**` : ip;
  };

  // 3. 샘플 로그인 감사 기록
  const loginRecords = [
    {
      id: '1',
      timestamp: '2026-01-30 14:22:10',
      ip: '192.168.1.100',
      device: 'Windows 10',
      browser: 'Chrome 120',
      success: true,
    },
    {
      id: '2',
      timestamp: '2026-01-29 09:15:44',
      ip: '192.168.1.100',
      device: 'Windows 10',
      browser: 'Chrome 120',
      success: true,
    },
  ];

  return (
    <div className="space-y-8 font-sans antialiased">
      {/* SECTION 1: 기본 인사 정보 마스터 (Read-only) */}
      <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <i className="ri-profile-line text-[#5C8D5A]"></i>
          <h4 className="text-[11px] font-black uppercase italic tracking-widest text-gray-400">
            Master HR Information
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
          <ReadOnlyField label="성명 (Name)" value={userInfo.name} />
          <ReadOnlyField label="직위 (Role)" value={userInfo.role} />
          <ReadOnlyField label="사번 (Employee ID)" value={userInfo.employeeId} isMono />
          <ReadOnlyField label="접근 권한 (Access Level)" value={userInfo.roleLevel} highlight />
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-5 py-2 text-[10px] font-bold italic text-gray-400">
          <i className="ri-error-warning-line"></i> 상기 정보는 인사팀 마스터 데이터에 의해 관리되며, 수정은 관리자
          승인이 필요합니다.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* SECTION 2: 연락처 업데이트 프로토콜 */}
        <div className="space-y-4">
          <SectionHeader icon="ri-contacts-line" label="Communication Settings" />
          <div className="space-y-4 rounded-none border border-gray-200 bg-white p-6 shadow-sm">
            <FormInput
              label="휴대폰 번호 (Phone)"
              value={contactInfo.phone}
              onChange={v => setContactInfo({ ...contactInfo, phone: v })}
              placeholder="010-0000-0000"
              isMono
            />
            <FormInput
              label="전자우편 (E-Mail)"
              value={contactInfo.email}
              onChange={v => setContactInfo({ ...contactInfo, email: v })}
              placeholder="example@agape.com"
            />
            <button
              onClick={() => {
                setIsSaving(true);
                setTimeout(() => {
                  setIsSaving(false);
                  alert('정보가 업데이트되었습니다.');
                }, 800);
              }}
              className="w-full rounded-none bg-[#5C8D5A] py-3 text-[12px] font-black uppercase text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548]"
            >
              {isSaving ? <i className="ri-loader-4-line animate-spin"></i> : 'Update Communication Data'}
            </button>
          </div>
        </div>

        {/* SECTION 3: 비밀번호 보안 프로토콜 */}
        <div className="space-y-4">
          <SectionHeader icon="ri-lock-password-line" label="Security Protocol" />
          <div className="space-y-4 rounded-none border border-gray-200 bg-white p-6 shadow-sm">
            <div
              className={clsx(
                'rounded-none border p-4 transition-all',
                showPasswordRules ? 'border-emerald-200 bg-emerald-50' : 'border-gray-100 bg-gray-50',
              )}
            >
              <button
                onClick={() => setShowPasswordRules(!showPasswordRules)}
                className="flex w-full items-center justify-between text-[11px] font-black uppercase text-gray-600"
              >
                <span>Password Security Guidelines</span>
                <i className={showPasswordRules ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}></i>
              </button>
              {showPasswordRules && (
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[10px] font-bold italic text-gray-400">
                  <li>최소 8자 이상의 영문/숫자/특수문자 조합</li>
                  <li>이전 비밀번호와 동일하거나 3회 이상 중복 문자 금지</li>
                </ul>
              )}
            </div>
            <FormInput
              label="현재 비밀번호"
              type="password"
              value={passwordForm.currentPassword}
              onChange={v => setPasswordForm({ ...passwordForm, currentPassword: v })}
            />
            <FormInput
              label="신규 비밀번호"
              type="password"
              value={passwordForm.newPassword}
              onChange={v => setPasswordForm({ ...passwordForm, newPassword: v })}
            />
            <button className="w-full rounded-none border border-[#5C8D5A] bg-white py-3 text-[12px] font-black uppercase text-[#5C8D5A] transition-all hover:bg-emerald-50">
              Execute Password Reset
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: 시스템 접속 감사 로그 */}
      <div className="space-y-4">
        <SectionHeader icon="ri-history-line" label="Recent Access Audit Logs" />
        <div className="overflow-hidden rounded-none border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Client IP</th>
                <th className="px-6 py-3">Device / Platform</th>
                <th className="px-6 py-3">Browser</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loginRecords.map(record => (
                <tr key={record.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-bold italic text-gray-800">{record.timestamp}</td>
                  <td className="px-6 py-4 font-mono text-gray-400">{maskIP(record.ip)}</td>
                  <td className="px-6 py-4 font-bold text-gray-600">{record.device}</td>
                  <td className="px-6 py-4 font-bold text-gray-600">{record.browser}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded-none border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase text-[#5C8D5A]">
                      Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-2 bg-gray-50 p-4 text-[10px] font-medium text-gray-400">
            <i className="ri-shield-user-line text-[#5C8D5A]"></i>
            보안을 위해 IP의 일부가 마스킹 처리되었습니다. 의심스러운 활동이 감지될 경우 보안팀에 보고하십시오.
          </div>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 섹션 타이틀 컴포넌트 */
function SectionHeader({ icon, label }: any) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <i className={clsx(icon, 'text-lg text-[#5C8D5A]')}></i>
      <h4 className="text-[11px] font-black uppercase italic tracking-widest text-gray-400">{label}</h4>
      <div className="h-[1px] flex-1 bg-gray-100"></div>
    </div>
  );
}

/** [Sub] 읽기 전용 필드 */
function ReadOnlyField({ label, value, isMono, highlight }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase tracking-tighter text-gray-400">{label}</label>
      <div
        className={clsx(
          'border-l-2 border-gray-200 py-1 pl-3 text-[13px] font-black',
          isMono ? 'font-mono italic' : '',
          highlight ? 'text-[#5C8D5A]' : 'text-gray-800',
        )}
      >
        {value}
      </div>
    </div>
  );
}

/** [Sub] 입력 폼 필드 */
function FormInput({ label, type = 'text', value, onChange, placeholder, isMono }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-none border border-gray-300 bg-gray-50 px-4 py-3 text-[12px] font-bold text-gray-800 shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white',
          isMono && 'font-mono',
        )}
      />
    </div>
  );
}
