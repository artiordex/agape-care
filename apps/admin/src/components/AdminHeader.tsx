interface AdminHeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onLogout, onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* 좌측 */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex items-center justify-center">
              <i className="ri-dashboard-line text-xl text-white"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Admin Dashboard</h1>
          </div>
        </div>

        {/* 우측 */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">관리자 모드</span>
          </div>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-logout-box-line"></i>
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </div>
    </header>
  );
}