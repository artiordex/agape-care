interface MealImage {
  id: string;
  url: string;
  uploadedAt: string;
}

interface MealPlan {
  id: string;
  date: string;
  breakfast: string;
  morning_snack: string;
  lunch: string;
  afternoon_snack: string;
  dinner: string;
  memo?: string;
  nutrition_manager: string;
  images: MealImage[];
}

interface Props {
  meal: MealPlan | null;
  onClose: () => void;
  onImageClick: (url: string) => void;
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function MealDetailModal({ meal, onClose, onImageClick }: Props) {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 z-10 border-b-2 border-gray-900 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-2xl font-bold text-gray-900">
                {new Date(meal.date).getFullYear()}년 {new Date(meal.date).getMonth() + 1}월{' '}
                {new Date(meal.date).getDate()}일 ({dayNames[new Date(meal.date).getDay()]})
              </h3>
              <p className="text-sm text-gray-600">담당 영양사: {meal.nutrition_manager}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50"
            >
              <i className="ri-close-line text-2xl text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* 식단 테이블 */}
          <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="border-b-2 border-gray-900 bg-gray-50">
                <tr>
                  <th className="w-32 border-r border-gray-200 p-4 text-left text-sm font-bold text-gray-700">구분</th>
                  <th className="p-4 text-left text-sm font-bold text-gray-700">식단</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">아침</td>
                  <td className="p-4">
                    <p className="whitespace-pre-line text-sm text-gray-900">{meal.breakfast || '-'}</p>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">
                    오전간식
                  </td>
                  <td className="p-4">
                    <p className="whitespace-pre-line text-sm text-gray-700">{meal.morning_snack || '-'}</p>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">점심</td>
                  <td className="p-4">
                    <p className="whitespace-pre-line text-sm font-medium text-gray-900">{meal.lunch || '-'}</p>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">
                    오후간식
                  </td>
                  <td className="p-4">
                    <p className="whitespace-pre-line text-sm text-gray-700">{meal.afternoon_snack || '-'}</p>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700">저녁</td>
                  <td className="p-4">
                    <p className="whitespace-pre-line text-sm font-medium text-gray-900">{meal.dinner || '-'}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 메모 */}
          {meal.memo && (
            <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <i className="ri-information-line mt-0.5 text-xl text-amber-600" />
                <div>
                  <h5 className="mb-1 font-semibold text-amber-900">특이사항</h5>
                  <p className="text-sm text-gray-700">{meal.memo}</p>
                </div>
              </div>
            </div>
          )}

          {/* 이미지들 */}
          {meal.images && meal.images.length > 0 && (
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                <i className="ri-image-line text-gray-600" />
                급식 사진
              </h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {meal.images.map(img => (
                  <div
                    key={img.id}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={img.url}
                      alt="급식 사진"
                      className="h-48 w-full object-cover transition-opacity group-hover:opacity-90"
                      onClick={() => onImageClick(img.url)}
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                      <i className="ri-zoom-in-line text-2xl text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
