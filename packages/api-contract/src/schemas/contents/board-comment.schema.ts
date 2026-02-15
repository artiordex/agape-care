/**
 * @description 게시판 댓글 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const BoardCommentBaseSchema = z.object({
  id: z.coerce.string(),
  postId: z.coerce.string(),
  parentId: z.coerce.string().nullable().optional(),
  authorId: z.coerce.string().nullable().optional(),
  content: z.string().min(1, '댓글 내용은 필수입니다.'),
  isDeleted: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  guestNickname: z.string().nullable().optional(),
  guestPassword: z.string().nullable().optional(),
  author: z
    .object({
      id: z.coerce.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
});

export type BoardComment = z.infer<typeof BoardCommentBaseSchema> & {
  replies?: BoardComment[];
};

export const BoardCommentSchema: z.ZodType<BoardComment> = BoardCommentBaseSchema.extend({
  replies: z.lazy(() => z.array(BoardCommentSchema)).optional(),
}) as any;
