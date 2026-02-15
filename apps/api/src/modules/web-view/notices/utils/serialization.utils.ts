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

  // Handle both snake_case (from raw JSON/View) and camelCase
  const idStr = toString(comment.id);
  const postIdStr = toString(comment.postId || comment.post_id);
  const parentIdVal = comment.parentId || comment.parent_id;
  const authorIdVal = comment.authorId !== undefined ? comment.authorId : comment.author_id;
  const authorNameVal = comment.authorName || comment.author_name;
  const guestNicknameVal = comment.guest_nickname || comment.guestNickname;
  const contentVal = comment.content;
  const isDeletedVal = comment.isDeleted !== undefined ? comment.isDeleted : comment.is_deleted;
  const createdAtVal = comment.createdAt || comment.created_at;
  const updatedAtVal = comment.updatedAt || comment.updated_at;

  console.log(
    `🔍 [DEBUG] serializeComment - id: ${idStr}, authorId: ${authorIdVal} (${typeof authorIdVal}), guestNickname: ${guestNicknameVal}`,
  );

  return {
    id: idStr,
    postId: postIdStr,
    parentId: parentIdVal ? toString(parentIdVal) : null,
    authorId: authorIdVal ? toString(authorIdVal) : null,
    content: contentVal || '',
    isDeleted: !!isDeletedVal,
    createdAt: createdAtVal ? new Date(createdAtVal) : new Date(),
    updatedAt: updatedAtVal ? new Date(updatedAtVal) : new Date(),
    author:
      authorIdVal !== null && authorIdVal !== undefined
        ? serializeAuthor(comment.author) || { id: toString(authorIdVal), name: authorNameVal || '회원', email: null }
        : guestNicknameVal
          ? { id: 'guest', name: guestNicknameVal, email: null }
          : { id: 'unknown', name: '알 수 없음', email: null },
    guestNickname: guestNicknameVal || null,
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

  // [Fix] Handle structure from View (nested { mealDate, meals: [] })
  // If items contains objects with 'meals' array, flatten it first or process it directly.
  const flatItems: any[] = [];
  items.forEach(item => {
    if (item.meals && Array.isArray(item.meals)) {
      item.meals.forEach((subItem: any) => {
        // Ensure date is propagated if missing in subItem
        flatItems.push({
          ...subItem,
          date: subItem.date || subItem.mealDate || item.mealDate || item.date,
          // Use subItem.id or fallback to item.id if available.
          // Note: item.id might be undefined in view structure, subItem.id should be there.
          id: subItem.id || item.id,
          mealPlanId: subItem.mealPlanId || item.id || '', // Fallback to empty string if missing
        });
      });
    } else {
      flatItems.push(item);
    }
  });

  flatItems.forEach(item => {
    const dateVal = item.date || item.mealDate;
    if (!dateVal) return;

    const dateStr = dateVal instanceof Date ? dateVal.toISOString().split('T')[0] : String(dateVal);

    if (!grouped.has(dateStr)) {
      grouped.set(dateStr, {
        id: toString(item.id || ''),
        mealPlanId: toString(item.mealPlanId || item.meal_plan_id || ''),
        date: dateStr,
        breakfast: '',
        breakfastImage: null,
        morningSnack: '',
        lunch: '',
        lunchImage: null,
        afternoonSnack: '',
        dinner: '',
        dinnerImage: null,
        createdAt:
          item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt || item.created_at || new Date().toISOString(),
        updatedAt:
          item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt || item.updated_at || new Date().toISOString(),
      });
    }

    const dailyMeal = grouped.get(dateStr)!;

    // View returns 'menuContent', 'mealType'. Direct query might return 'mainMenu', 'sideMenu', etc.
    // If 'menuContent' exists, use it directly. Otherwise join main/side/soup/dessert.
    const menuContent = item.menuContent || item.menu_content;
    const constructedMenu =
      (menuContent
        ? menuContent
        : [item.mainMenu || item.main_menu, item.sideMenu || item.side_menu, item.soup, item.dessert].filter(Boolean).join('\n')) || '';

    switch (item.type?.toUpperCase() || item.mealType?.toUpperCase() || item.meal_type?.toUpperCase()) {
      case 'BREAKFAST':
        dailyMeal.breakfast = constructedMenu;
        break;
      case 'MORNING_SNACK':
        dailyMeal.morningSnack = constructedMenu;
        break;
      case 'LUNCH':
        dailyMeal.lunch = constructedMenu;
        break;
      case 'AFTERNOON_SNACK':
        dailyMeal.afternoonSnack = constructedMenu;
        break;
      case 'DINNER':
        dailyMeal.dinner = constructedMenu;
        break;
    }
  });

  return Array.from(grouped.values()).sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * [Web] 식단표 상세 직렬화
 */
export const serializeWebMealPlan = (mp: any) => {
  if (!mp) return null;
  return {
    id: toString(mp.id),
    facilityCode: mp.facilityCode,
    weekStartDate: mp.weekStartDate instanceof Date ? mp.weekStartDate.toISOString() : mp.weekStartDate,
    mealMonth: mp.mealMonth || (mp.weekStartDate ? Number(new Date(mp.weekStartDate).toISOString().slice(0, 7).replace('-', '')) : 0),
    status: mp.status,
    nutritionManager: mp.nutritionManager,
    notes: mp.notes,
    createdBy: toString(mp.creatorId),
    createdAt: mp.createdAt instanceof Date ? mp.createdAt.toISOString() : mp.createdAt,
    updatedAt: mp.updatedAt instanceof Date ? mp.updatedAt.toISOString() : mp.updatedAt,
    creator: mp.creatorId
      ? {
          id: toString(mp.creatorId),
          name: mp.creatorName,
        }
      : null,
    dailyMeals: groupMealPlanItemsByDate(mp.weekMeals || mp.week_meals || mp.mealPlanItems || mp.meal_plan_items || []),
  };
};
