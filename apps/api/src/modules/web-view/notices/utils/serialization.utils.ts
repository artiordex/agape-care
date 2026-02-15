/**
 * Description : serialization.utils.ts - 📌 게시판/공지사항 데이터 직렬화 유틸리티
 * Author : Shiwoo Min
 * Date : 2026-02-09
 */

/**
 * BigInt를 문자열로 안전하게 변환
 * 필수 ID 필드 등의 경우 null 대신 빈 문자열 또는 기본값을 반환하여 contract 준수
 */
const toString = (val: any, fallback: string = ''): string => {
  if (val === null || val === undefined) return fallback;
  return val.toString();
};

/**
 * [공통] 작성자(User) 직렬화
 */
export const serializeAuthor = (author: any) => {
  if (!author) return null;
  return {
    id: toString(author.id),
    name: author.name || '알 수 없음',
    email: author.email || null,
  };
};

/**
 * [공통] 파일(FileStorage) 직렬화
 */
export const serializeFile = (file: any) => {
  if (!file) return null;
  return {
    id: toString(file.id),
    url: file.url || '',
    filename: file.filename || '',
    size: file.size ? Number(file.size) : 0,
    mimetype: file.mimetype || '', // match contract naming
  };
};

/**
 * [게시판] 게시글 파일 매핑(BoardFile) 직렬화
 */
export const serializeBoardFile = (bf: any) => {
  if (!bf) return null;
  return {
    id: toString(bf.id),
    postId: toString(bf.postId),
    fileId: toString(bf.fileId),
    createdAt: bf.createdAt,
    file: serializeFile(bf.file),
  };
};

/**
 * [게시판] 댓글(BoardComment) 직렬화 (재귀)
 */
export const serializeComment = (comment: any): any => {
  if (!comment) return null;

  return {
    id: toString(comment.id),
    postId: toString(comment.postId),
    parentId: comment.parentId ? toString(comment.parentId) : null,
    authorId: comment.authorId ? toString(comment.authorId) : null,
    content: comment.content || '',
    isDeleted: !!comment.isDeleted,
    createdAt: comment.createdAt || new Date(),
    updatedAt: comment.updatedAt || new Date(),
    author:
      serializeAuthor(comment.author) ||
      (comment.authorId && comment.authorName ? { id: toString(comment.authorId), name: comment.authorName, email: null } : null),
    // 재귀적으로 대댓글 직렬화
    replies: Array.isArray(comment.replies) ? comment.replies.map((r: any) => serializeComment(r)) : [],
  };
};

/**
 * [게시판/공지사항] 게시글(BoardPost/Notice) 직렬화
 */
export const serializePost = (post: any) => {
  if (!post) return null;

  const author = post.author || post.creator;
  const authorIdVal = post.authorId || post.createdBy;
  const authorId = authorIdVal ? toString(authorIdVal) : null;

  return {
    id: toString(post.id),
    boardKey: post.boardKey || 'NOTICE',
    title: post.title || '',
    content: post.content || '',
    category: post.category || 'GENERAL',
    isActive: post.isActive !== undefined ? !!post.isActive : true,
    viewCount: post.viewCount ? Number(post.viewCount) : 0,
    isPinned: !!post.isPinned,
    isLocked: !!post.isLocked,
    publishedAt: post.publishedAt || null,
    authorId: authorId,
    createdBy: authorId, // For compatibility with NoticeSchema
    createdAt: post.createdAt || new Date(),
    updatedAt: post.updatedAt || new Date(),
    author: serializeAuthor(author),
    files: Array.isArray(post.files) ? post.files.map((f: any) => serializeBoardFile(f)).filter((f: any) => f !== null) : [],
    comments: Array.isArray(post.comments) ? post.comments.map((c: any) => serializeComment(c)).filter((c: any) => c !== null) : [],
  };
};

/**
 * [갤러리] 갤러리 파일 매핑(GalleryFile) 직렬화
 */
export const serializeGalleryFile = (gf: any) => {
  if (!gf) return null;
  return {
    id: toString(gf.id),
    galleryId: toString(gf.galleryId || gf.noticeId),
    fileId: toString(gf.fileId),
    file: serializeFile(gf.file),
  };
};

/**
 * [갤러리] 갤러리 항목(GalleryItem) 직렬화
 */
export const serializeGalleryItem = (item: any) => {
  if (!item) return null;

  const author = item.author || item.creator;
  const authorId = item.authorId || item.createdBy;

  return {
    id: toString(item.id),
    category: item.category || 'GALLERY',
    title: item.title || '',
    description: item.description || '',
    authorId: authorId ? toString(authorId) : null,
    viewCount: item.viewCount ? Number(item.viewCount) : 0,
    createdAt: item.createdAt || new Date(),
    updatedAt: item.updatedAt || new Date(),
    author: serializeAuthor(author),
    files: Array.isArray(item.files) ? item.files.map((f: any) => serializeGalleryFile(f)) : [],
  };
};

/**
 * [Web] 공지사항 목록 직렬화
 */
export const serializeWebNotice = (n: any): any => {
  if (!n) return null;
  return {
    id: toString(n.id) || '',
    title: n.title || '',
    content: n.content || '',
    category: (n.category as string) || 'GENERAL',
    isPinned: !!n.isPinned,
    isActive: !!n.isActive,
    viewCount: n.viewCount ? Number(n.viewCount) : 0,
    publishedAt: n.publishedAt || null,
    createdBy: toString(n.creatorId) || null,
    createdAt: n.createdAt || new Date(),
    updatedAt: n.updatedAt || new Date(),
    creatorName: n.creatorName || '알 수 없음',
    fileCount: n.fileCount ? Number(n.fileCount) : 0,
    files: Array.isArray(n.files) ? (n.files as any) : [],
  };
};

/**
 * [Web] 공지사항 상세 직렬화
 */
export const serializeWebNoticeDetail = (n: any): any => {
  if (!n) return null;
  return {
    ...serializeWebNotice(n),
    prevNotice: n.prevNotice || null,
    nextNotice: n.nextNotice || null,
  };
};

/**
 * [Web] 게시판 목록 직렬화
 */
export const serializeWebBoardPost = (post: any): any => {
  if (!post) return null;
  return {
    id: toString(post.id) || '',
    boardKey: post.boardKey || 'NOTICE',
    title: post.title || '',
    content: post.content || '',
    viewCount: post.viewCount ? Number(post.viewCount) : 0,
    isPinned: !!post.isPinned,
    isLocked: !!post.isLocked,
    createdAt: post.createdAt || new Date(),
    updatedAt: post.updatedAt || new Date(),
    authorName: post.authorName || '알 수 없음',
    authorId: toString(post.authorId) || null,
    commentCount: post.commentCount ? Number(post.commentCount) : 0,
    fileCount: post.fileCount ? Number(post.fileCount) : 0,
    files: Array.isArray(post.files) ? post.files : [],
  };
};

/**
 * [Web] 게시글 상세 직렬화
 */
export const serializeWebBoardPostDetail = (post: any): any => {
  if (!post) return null;
  return {
    ...serializeWebBoardPost(post),
    comments: Array.isArray(post.comments) ? post.comments.map((c: any) => serializeComment(c)).filter((c: any) => c !== null) : [],
    prevPost: post.prevPost || null,
    nextPost: post.nextPost || null,
  };
};

/**
 * [Web] 갤러리 목록 직렬화
 */
export const serializeWebGalleryItem = (item: any) => {
  if (!item) return null;
  return {
    id: toString(item.id),
    category: item.category || 'GALLERY',
    title: item.title || '',
    description: item.description || '',
    eventDate: item.eventDate || null,
    isPublic: !!item.isPublic,
    viewCount: 0, // Gallery view count from SQL is currently null or not present
    createdAt: item.createdAt || new Date(),
    updatedAt: item.updatedAt || new Date(),
    creatorName: item.creatorName || '알 수 없음',
    creatorId: toString(item.creatorId),
    fileCount: item.fileCount ? Number(item.fileCount) : 0,
    thumbnail: item.thumbnail || null,
    files: Array.isArray(item.files) ? item.files : [],
  };
};

/**
 * [식단표] 일일 식단 그룹화
 */
export const groupMealPlanItemsByDate = (items: any[]) => {
  const grouped = new Map<string, any>();

  items.forEach(item => {
    const dateStr = item.date instanceof Date ? item.date.toISOString().split('T')[0] : String(item.date);

    if (!grouped.has(dateStr)) {
      grouped.set(dateStr, {
        id: toString(item.id),
        mealPlanId: toString(item.mealPlanId),
        date: dateStr,
        breakfast: null,
        morningSnack: null,
        lunch: null,
        afternoonSnack: null,
        dinner: null,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    }

    const dailyMeal = grouped.get(dateStr)!;

    switch (item.type?.toUpperCase() || item.mealType?.toUpperCase()) {
      case 'BREAKFAST':
        dailyMeal.breakfast = [item.mainMenu, item.sideMenu, item.soup, item.dessert].filter(Boolean).join('\n');
        break;
      case 'MORNING_SNACK':
        dailyMeal.morningSnack = [item.mainMenu, item.sideMenu].filter(Boolean).join('\n');
        break;
      case 'LUNCH':
        dailyMeal.lunch = [item.mainMenu, item.sideMenu, item.soup, item.dessert].filter(Boolean).join('\n');
        break;
      case 'AFTERNOON_SNACK':
        dailyMeal.afternoonSnack = [item.mainMenu, item.sideMenu].filter(Boolean).join('\n');
        break;
      case 'DINNER':
        dailyMeal.dinner = [item.mainMenu, item.sideMenu, item.soup, item.dessert].filter(Boolean).join('\n');
        break;
    }
  });

  return Array.from(grouped.values());
};

/**
 * [Web] 식단표 상세 직렬화
 */
export const serializeWebMealPlan = (mp: any) => {
  if (!mp) return null;
  return {
    id: toString(mp.id),
    facilityCode: mp.facilityCode,
    weekStartDate: mp.weekStartDate,
    mealMonth: mp.mealMonth || (mp.weekStartDate ? Number(new Date(mp.weekStartDate).toISOString().slice(0, 7).replace('-', '')) : 0),
    status: mp.status,
    nutritionManager: mp.nutritionManager,
    notes: mp.notes,
    createdBy: toString(mp.creatorId),
    createdAt: mp.createdAt,
    updatedAt: mp.updatedAt,
    creator: mp.creatorId
      ? {
          id: toString(mp.creatorId),
          name: mp.creatorName,
        }
      : null,
    dailyMeals: groupMealPlanItemsByDate(mp.weekMeals || mp.mealPlanItems || []),
  };
};
