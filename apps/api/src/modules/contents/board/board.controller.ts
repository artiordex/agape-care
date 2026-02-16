/**
 * Description : BoardController.ts - 📌 게시판 API Controller
 * Author : (User)
 * Date : 2026-02-16
 */

import { contentContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { BoardService } from './board.service';

@ApiTags('Contents - Board')
@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '게시글 목록 조회' })
  @TsRestHandler(contentContract.getPosts)
  async getPosts() {
    return tsRestHandler(contentContract.getPosts, async ({ query }) => {
      const { boardKey, page, limit } = query;
      const skip = (page - 1) * limit;

      // If 'ALL', fetch all posts; otherwise filter by boardKey
      const where = boardKey === 'ALL' ? {} : { boardKey };

      const [data, total] = await Promise.all([
        this.boardService.findAll({
          skip,
          take: limit,
          where,
          orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        }),
        this.boardService.count(where),
      ]);

      return {
        status: 200,
        body: {
          success: true,
          data,
          meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
          },
        },
      };
    });
  }

  @ApiOperation({ summary: '게시글 상세 조회' })
  @TsRestHandler(contentContract.getPost)
  async getPost() {
    return tsRestHandler(contentContract.getPost, async ({ params: { id } }) => {
      const data = await this.boardService.findOne(BigInt(id));

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Post not found' },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  @ApiOperation({ summary: '게시글 생성' })
  @TsRestHandler(contentContract.createPost)
  async createPost() {
    return tsRestHandler(contentContract.createPost, async ({ body }) => {
      const data = await this.boardService.create(body);

      return {
        status: 201,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  @ApiOperation({ summary: '게시글 수정' })
  @TsRestHandler(contentContract.updatePost)
  async updatePost() {
    return tsRestHandler(contentContract.updatePost, async ({ params: { id }, body }) => {
      // Exclude updatedBy if it's not in schema or handled in service
      // board.service.update handles explicit undefined for updatedBy if needed
      const data = await this.boardService.update({
        where: { id: BigInt(id) },
        data: body,
      });

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Post not found' },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @TsRestHandler(contentContract.deletePost)
  async deletePost() {
    return tsRestHandler(contentContract.deletePost, async ({ params: { id } }) => {
      await this.boardService.delete({ id: BigInt(id) });

      return {
        status: 200,
        body: {
          success: true,
          data: { success: true },
        },
      };
    });
  }

  @ApiOperation({ summary: '댓글 목록 조회' })
  @TsRestHandler(contentContract.getComments)
  async getComments() {
    return tsRestHandler(contentContract.getComments, async ({ params: { postId } }) => {
      const data = await this.boardService.findComments(BigInt(postId));
      return { status: 200, body: { success: true, data: data as any } };
    });
  }

  @ApiOperation({ summary: '댓글 생성' })
  @TsRestHandler(contentContract.createComment)
  async createComment() {
    return tsRestHandler(contentContract.createComment, async ({ body }) => {
      const data = await this.boardService.createComment(body);
      return { status: 201, body: { success: true, data: data as any } };
    });
  }
}
