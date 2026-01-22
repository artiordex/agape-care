
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  writer_name: string;
  content: string;
  view_count: number;
  image_urls: string[];
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
}

interface BlockedWord {
  id: string;
  word: string;
  created_at: string;
}

export default function FreeBoardAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [blockedWords, setBlockedWords] = useState<BlockedWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newWord, setNewWord] = useState('');
  const [activeTab, setActiveTab] = useState<'posts' | 'words'>('posts');

  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    fetchPosts();
    fetchBlockedWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async (search = '') => {
    try {
      setLoading(true);
      const url = search
        ? `${supabaseUrl}/functions/v1/admin-free-board?search=${encodeURIComponent(
            search,
          )}`
        : `${supabaseUrl}/functions/v1/admin-free-board`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlockedWords = async () => {
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/admin-free-board/blocked-words`,
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: BlockedWord[] = await response.json();
      setBlockedWords(data);
    } catch (error) {
      console.error('차단 단어 로딩 실패:', error);
    }
  };

  const handleSearch = () => {
    fetchPosts(searchQuery);
  };

  const handleToggleHide = async (postId: string, currentHidden: boolean) => {
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/admin-free-board/toggle-hide`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: postId,
            isHidden: !currentHidden,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      fetchPosts(searchQuery);
    } catch (error) {
      console.error('게시글 숨김 처리 실패:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('이 게시글을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/admin-free-board`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      fetchPosts(searchQuery);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  const handleAddBlockedWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/admin-free-board/blocked-words`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ word: newWord.trim() }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      setNewWord('');
      fetchBlockedWords();
    } catch (error) {
      console.error('차단 단어 추가 실패:', error);
    }
  };

  const handleDeleteBlockedWord = async (wordId: string) => {
    if (!confirm('이 차단 단어를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/admin-free-board/blocked-words`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: wordId }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      fetchBlockedWords();
    } catch (error) {
      console.error('차단 단어 삭제 실패:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 탭 선택 */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-6 py-3 font-semibold transition-colors cursor-pointer ${
            activeTab === 'posts'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          게시글 관리
        </button>
        <button
          onClick={() => setActiveTab('words')}
          className={`px-6 py-3 font-semibold transition-colors cursor-pointer ${
            activeTab === 'words'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          차단 단어 관리
        </button>
      </div>

      {/* 게시글 관리 */}
      {activeTab === 'posts' && (
        <>
          {/* 검색 */}
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="제목, 내용, 작성자 검색"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              검색
            </button>
          </div>

          {/* 게시글 목록 */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      제목
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      작성자
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      조회수
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      작성일
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      상태
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className={post.is_hidden ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {post.content.replace(/<[^>]*>/g, '')}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{post.writer_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{post.view_count}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(post.created_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.is_hidden
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {post.is_hidden ? '숨김' : '표시'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleHide(post.id, post.is_hidden)}
                            className="px-3 py-1 text-sm border border-amber-600 text-amber-600 rounded hover:bg-amber-50 transition-colors whitespace-nowrap cursor-pointer"
                          >
                            {post.is_hidden ? '표시' : '숨김'}
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors whitespace-nowrap cursor-pointer"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* 차단 단어 관리 */}
      {activeTab === 'words' && (
        <>
          {/* 차단 단어 추가 */}
          <form onSubmit={handleAddBlockedWord} className="flex gap-4">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="차단할 단어 입력"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              추가
            </button>
          </form>

          {/* 차단 단어 목록 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                차단 단어 목록 ({blockedWords.length}개)
              </h3>
              <div className="flex flex-wrap gap-2">
                {blockedWords.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <span className="text-sm text-red-800 font-medium">{word.word}</span>
                    <button
                      onClick={() => handleDeleteBlockedWord(word.id)}
                      className="w-5 h-5 flex items-center justify-center text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <i className="ri-close-line text-lg"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
