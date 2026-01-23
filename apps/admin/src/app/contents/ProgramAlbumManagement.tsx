export default function ProgramAlbumManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">프로그램 참여앨범 관리</h1>
        <p className="text-sm text-gray-500 mt-1">프로그램별 활동 사진 및 게시글을 관리합니다</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="제목 또는 프로그램명 검색..."
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>전체 카테고리</option>
              <option>행사</option>
              <option>일상</option>
              <option>인지프로그램</option>
              <option>여가활동</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap">
            <i className="ri-add-line mr-1"></i>
            게시글 작성
          </button>
        </div>

        <div className="text-center py-12 text-gray-500">
          <i className="ri-image-line text-5xl mb-4 text-gray-300"></i>
          <p className="text-sm">등록된 앨범이 없습니다</p>
          <p className="text-xs mt-1">프로그램 활동 사진을 업로드해 주세요</p>
        </div>
      </div>
    </div>
  );
}
