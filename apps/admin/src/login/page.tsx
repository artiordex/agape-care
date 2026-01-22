import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // 계정 정보 (실제 운영 시 서버 인증 권장)
  const ADMIN_ACCOUNTS = {
    'admin': { password: '0000', role: 'super-admin', name: '최고관리자' },
    'director': { password: '1111', role: 'director', name: '원장' },
    'manager': { password: '2222', role: 'manager', name: '사무국장' },
    'socialworker': { password: '3333', role: 'social-worker', name: '사회복지사' },
    'nurse': { password: '1111', role: 'nurse', name: '간호조무사' },
    'careworker': { password: '2222', role: 'care-worker', name: '요양보호사' },
    'cook': { password: '3333', role: 'cook', name: '조리원' },
    'accountant': { password: '0000', role: 'accountant', name: '회계담당' }
  };

  useEffect(() => {
    // 이미 인증된 경우 대시보드로 이동
    const isAuth = localStorage.getItem('admin_auth');
    if (isAuth === '1') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const account = ADMIN_ACCOUNTS[username as keyof typeof ADMIN_ACCOUNTS];
    
    if (account && password === account.password) {
      localStorage.setItem('admin_auth', '1');
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_role', account.role);
      localStorage.setItem('admin_name', account.name);
      navigate('/admin/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50 flex items-center justify-center px-4">
      <div className={`w-full max-w-md transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* 로고 영역 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <i className="ri-shield-keyhole-line text-4xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 전용 페이지</h1>
            <p className="text-gray-600">아이디와 비밀번호를 입력하세요</p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                아이디
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                placeholder="아이디 입력"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                  placeholder="비밀번호 입력"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl`}></i>
                </button>
              </div>
              {error && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm animate-fadeIn">
                  <i className="ri-error-warning-line"></i>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-login-box-line text-xl"></i>
              <span>로그인</span>
            </button>
          </form>

          {/* 테스트 계정 안내 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-2">
              <p className="font-semibold text-gray-700 mb-3">📋 테스트 계정</p>
              <div className="space-y-1 bg-gray-50 p-3 rounded-lg">
                <p><span className="font-medium">admin / 0000</span> → 최고관리자</p>
                <p><span className="font-medium">director / 1111</span> → 원장</p>
                <p><span className="font-medium">manager / 2222</span> → 사무국장</p>
                <p><span className="font-medium">socialworker / 3333</span> → 사회복지사</p>
                <p><span className="font-medium">nurse / 1111</span> → 간호조무사</p>
                <p><span className="font-medium">careworker / 2222</span> → 요양보호사</p>
                <p><span className="font-medium">cook / 3333</span> → 조리원</p>
                <p><span className="font-medium">accountant / 0000</span> → 회계담당</p>
              </div>
            </div>
          </div>
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer inline-flex items-center gap-1"
          >
            <i className="ri-arrow-left-line"></i>
            홈으로 돌아가기
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s;
        }
      `}</style>
    </div>
  );
}