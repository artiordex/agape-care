import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  views: number;
  isPublished: boolean;
}

export default function FreeBoardManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const categories = ['공지', '일상', '건의', '문의', '기타'];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const saved = localStorage.getItem('admin_freeboard');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      const initial: Post[] = [
        {
          id: 1,
          title: '환영합니다',
          content: '자유게시판에 오신 것을 환영합니다.',
          author: '관리자',
          category: '공지',
          date: new Date().toISOString().split('T')[0],
          views: 0,
          isPublished: true,
        }
      ];
      setPosts(initial);
      localStorage.setItem('admin_freeboard', JSON.stringify(initial));
    }
  };

  const savePosts = (updatedPosts: Post[]) => {
    localStorage.setItem('admin_freeboard', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleAdd = () => {
    setEditingPost({
      id: Date.now(),
      title: '',
      content: '',
      author: '',
      category: '일상',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      isPublished: true,
    });
    setShowModal(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost({ ...post });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingPost) return;

    if (!editingPost.title.trim() || !editingPost.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const existing = posts.find(p => p.id === editingPost.id);
    let updated;
    
    if (existing) {
      updated = posts.map(p => p.id === editingPost.id ? editingPost : p);
    } else {
      updated = [editingPost, ...posts];
    }

    savePosts(updated);
    setShowModal(false);
    setEditingPost(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm('이 게시글을 삭제하시겠습니까?')) return;
    savePosts(posts.filter(p => p.id !== id));
  };

  const togglePublish = (id: number) => {
    const updated = posts.map(p => 
      p.id === id ? { ...p, isPublished: !p.isPublished } : p
    );
    savePosts(updated);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자유게시판 관리</h1>
          <p className="text-sm text-gray-600 mt-1">
            총 {posts.length}개의 게시글 • 공개 {posts.filter(p => p.isPublished).length}개
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          새 게시글
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="제목 또는 작성자 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">전체 카테고리</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post, index) => (
                <tr 
                  key={post.id}
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublish(post.id)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                        post.isPublished
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {post.isPublished ? '공개' : '비공개'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-teal-600 hover:text-teal-900 mr-3 cursor-pointer"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {posts.find(p => p.id === editingPost.id) ? '게시글 수정' : '새 게시글 작성'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="작성자 이름"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="게시글 제목"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="게시글 내용을 입력하세요..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={editingPost.isPublished}
                  onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700 cursor-pointer">
                  게시글 공개
                </label>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingPost(null);
                }}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all whitespace-nowrap cursor-pointer"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
