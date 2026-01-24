
import { useState } from 'react';

interface UserInfo {
  name: string;
  role: string;
  employeeId: string;
  roleLevel: string;
  phone: string;
  email: string;
  avatar: string;
}

interface SettingsTabProps {
  userInfo: UserInfo;
}

interface LoginRecord {
  id: string;
  timestamp: string;
  ip: string;
  device: string;
  browser: string;
  success: boolean;
}

export default function SettingsTab({ userInfo }: SettingsTabProps) {
  const [contactInfo, setContactInfo] = useState({
    phone: userInfo.phone,
    email: userInfo.email,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 샘플 로그인 기록
  // Fixed generic syntax: useState<LoginRecord[]>(...)
  const [loginRecords] = useState<LoginRecord[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      ip: '192.168.1.100',
      device: 'Windows 10',
      browser: 'Chrome 120',
      success: true,
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      ip: '192.168.1.100',
      device: 'Windows 10',
      browser: 'Chrome 120',
      success: true,
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      ip: '192.168.1.101',
      device: 'iPhone 14',
      browser: 'Safari 17',
      success: true,
    },
  ]);

  // 연락처 저장
  const handleSaveContact = async () => {
    // 유효성 검사
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(contactInfo.phone.replace(/-/g, ''))) {
      alert('올바른 휴대폰 번호 형식이 아닙니다.');
      return;
    }

    if (!emailRegex.test(contactInfo.email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setIsSaving(true);

    // API 호출 시뮬레이션
    setTimeout(() => {
      alert('연락처 정보가 저장되었습니다.');
      setIsSaving(false);
    }, 1000);
  };

  // 비밀번호 변경
  const handleChangePassword = async () => {
    // 유효성 검사
    if (!passwordForm.currentPassword) {
      alert('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (!passwordForm.newPassword) {
      alert('새 비밀번호를 입력해주세요.');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    // 영문, 숫자, 특수문자 포함 검사
    const hasLetter = /[a-zA-Z]/.test(passwordForm.newPassword);
    const hasNumber = /[0-9]/.test(passwordForm.newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.newPassword);

    if (!hasLetter || !hasNumber || !hasSpecial) {
      alert('비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
      return;
    }

    // 동일 문자 반복 검사
    if (/(.)\1{2,}/.test(passwordForm.newPassword)) {
      alert('동일한 문자를 3회 이상 반복할 수 없습니다.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsSaving(true);

    // API 호출 시뮬레이션
    setTimeout(() => {
      alert('비밀번호가 변경되었습니다.');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsSaving(false);
    }, 1000);
  };

  // IP 마스킹
  const maskIP = (ip: string) => {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.**`;
    }
    return ip;
  };

  return (
    <div className="space-y-4">
      {/* 기본 정보 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <i className="ri-information-line text-emerald-600"></i>
          기본 정보
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input
              type="text"
              value={userInfo.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">관리자에게 문의하여 변경하세요</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
            <input
              type="text"
              value={userInfo.role}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
            <input
              type="text"
              value={userInfo.employeeId}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">권한</label>
            <input
              type="text"
              value={userInfo.roleLevel}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* 연락처 정보 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <i className="ri-contacts-line text-emerald-600"></i>
          연락처 정보
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="010-1234-5678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveContact}
            disabled={isSaving}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-1"></i>
                저장 중...
              </>
            ) : (
              <>
                <i className="ri-save-line mr-1"></i>
                저장하기
              </>
            )}
          </button>
        </div>
      </div>

      {/* 비밀번호 변경 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <i className="ri-lock-password-line text-emerald-600"></i>
          비밀번호 변경
        </h3>

        {/* 비밀번호 정책 안내 */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <button
            onClick={() => setShowPasswordRules(!showPasswordRules)}
            className="w-full flex items-center justify-between cursor-pointer"
          >
            <span className="text-sm font-medium text-blue-900">비밀번호 정책</span>
            <i className={`ri-arrow-${showPasswordRules ? 'up' : 'down'}-s-line text-blue-900`}></i>
          </button>
          {showPasswordRules && (
            <ul className="mt-3 space-y-1 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line flex-shrink-0 mt-0.5"></i>
                <span>최소 8자 이상</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line flex-shrink-0 mt-0.5"></i>
                <span>영문, 숫자, 특수문자 포함</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line flex-shrink-0 mt-0.5"></i>
                <span>동일 문자 3회 이상 반복 불가</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line flex-shrink-0 mt-0.5"></i>
                <span>이전 비밀번호와 다른 비밀번호 사용</span>
              </li>
            </ul>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleChangePassword}
            disabled={isSaving}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-1"></i>
                변경 중...
              </>
            ) : (
              <>
                <i className="ri-lock-unlock-line mr-1"></i>
                비밀번호 변경
              </>
            )}
          </button>
        </div>
      </div>

      {/* 최근 로그인 기록 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <i className="ri-history-line text-emerald-600"></i>
          최근 로그인 기록
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">로그인 시각</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">접속 IP</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">기기</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">브라우저</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">상태</th>
              </tr>
            </thead>
            <tbody>
              {loginRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {new Date(record.timestamp).toLocaleString('ko-KR')}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">
                    {maskIP(record.ip)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.device}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.browser}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.success ? '성공' : '실패'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-500 flex items-start gap-2">
          <i className="ri-information-line flex-shrink-0 mt-0.5"></i>
          <p>
            보안을 위해 IP 주소 일부가 마스킹되어 표시됩니다. 의심스러운 접속 기록이 있다면 즉시
            비밀번호를 변경하고 관리자에게 문의하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
