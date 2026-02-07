/**
 * @description 게시판 댓글 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const BoardCommentSchema = z.object({
  id: z.coerce.string(),
  postId: z.coerce.string(),
  parentId: z.coerce.string().nullable().optional(), // 대댓글 구조
  authorId: z.coerce.string().nullable().optional(),
  content: z.string().min(1, '댓글 내용은 필수입니다.'),
  isDeleted: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BoardComment = z.infer<typeof BoardCommentSchema>;
