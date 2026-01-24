interface AdminHeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onLogout, onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* 좌측 */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-amber-500">
              <i className="ri-dashboard-line text-xl text-white"></i>
            </div>
            <h1 className="hidden text-xl font-bold text-gray-900 sm:block">Agape Care 요양원</h1>
          </div>
        </div>

        {/* 우측 */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg bg-green-50 px-4 py-2 sm:flex">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-green-700">관리자 모드</span>
          </div>

          <button
            onClick={onLogout}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-red-50 px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <i className="ri-logout-box-line"></i>
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </div>
    </header>
  );
}
