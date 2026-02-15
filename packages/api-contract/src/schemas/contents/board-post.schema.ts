/**
 * @description 게시판 게시글 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';
import { BoardCommentSchema } from './board-comment.schema.js';

export const BoardPostSchema = z
  .object({
    id: z.coerce.string(),
    boardKey: z.coerce.string().min(1, '게시판 키는 필수입니다.'), // 'FREE', 'QNA' 등
    title: z.string().min(1, '제목은 필수입니다.'),
    content: z.string().min(1, '내용은 필수입니다.'),
    authorId: z.coerce.string().nullable().optional(),
    viewCount: z.number().int().default(0),
    isPinned: z.boolean().default(false),
    isLocked: z.boolean().default(false),
    authorName: z.string().nullable().optional(),
    commentCount: z.number().int().default(0),
    fileCount: z.number().int().default(0),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),

    // Relational fields (optional)
    author: z
      .object({
        id: z.coerce.string(),
        name: z.string(),
        email: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
    files: z
      .array(
        z.object({
          id: z.string(),
          file: z
            .object({
              id: z.string(),
              url: z.string(),
              filename: z.string(),
            })
            .nullable()
            .optional(),
        }),
      )
      .optional(),
    comments: z.array(BoardCommentSchema).optional(),
  })
  .catchall(z.any());

export type BoardPost = z.infer<typeof BoardPostSchema>;
