import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  // --- Posts ---

  async createPost(data: Prisma.BoardPostCreateInput) {
    return this.prisma.boardPost.create({
      data,
    });
  }

  async findAllPosts(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BoardPostWhereUniqueInput;
    where?: Prisma.BoardPostWhereInput;
    orderBy?: Prisma.BoardPostOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.boardPost.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });
  }

  async findOnePost(where: Prisma.BoardPostWhereUniqueInput) {
    return this.prisma.boardPost.findUnique({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            author: { select: { id: true, name: true } },
            replies: { include: { author: { select: { id: true, name: true } } } },
          },
        },
        files: true,
      },
    });
  }

  async updatePost(params: { where: Prisma.BoardPostWhereUniqueInput; data: Prisma.BoardPostUpdateInput }) {
    const { where, data } = params;
    return this.prisma.boardPost.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.BoardPostWhereUniqueInput) {
    return this.prisma.boardPost.delete({
      where,
    });
  }

  // --- Comments ---

  async createComment(data: Prisma.BoardCommentCreateInput) {
    return this.prisma.boardComment.create({
      data,
    });
  }

  async deleteComment(where: Prisma.BoardCommentWhereUniqueInput) {
    // Soft delete usually, but here physical delete or flag update
    return this.prisma.boardComment.update({
      where,
      data: { isDeleted: true, content: 'Deleted Comment' },
    });
  }
}
