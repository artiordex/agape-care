/**
 * Description : popup-serialization.utils.ts - 📌 팝업 데이터 직렬화 유틸리티
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

const toString = (val: any, fallback: string = ''): string => {
  if (val === null || val === undefined) return fallback;
  return val.toString();
};

export const serializePopupBanner = (pb: any) => {
  if (!pb) return null;
  return {
    id: toString(pb.id),
    title: pb.title || '',
    content: pb.content || null,
    imageUrl: pb.imageUrl || pb.image_url || null,
    linkUrl: pb.linkUrl || pb.link_url || null,
    displayType: pb.displayType || pb.display_type || 'POPUP',
    position: pb.position || null,
    width: pb.width ? Number(pb.width) : null,
    height: pb.height ? Number(pb.height) : null,
    startDate: pb.startDate || pb.start_date || new Date(),
    endDate: pb.endDate || pb.end_date || new Date(),
    isActive: pb.isActive !== undefined ? !!pb.isActive : true,
    showOnce: pb.showOnce !== undefined ? !!pb.showOnce : false,
    priority: pb.priority ? Number(pb.priority) : 0,
    createdBy: toString(pb.createdBy || pb.created_by),
    createdAt: pb.createdAt || pb.created_at || new Date(),
    updatedAt: pb.updatedAt || pb.updated_at || new Date(),
  };
};
