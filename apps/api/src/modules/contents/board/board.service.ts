/**
 * Description : BoardService.ts - 📌 게시판 서비스
 * Author : (User)
 * Date : 2026-02-16
 */

import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as serialize from '../../web-view/notices/utils/serialization.utils';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 게시글 목록 조회
   */
  async findAll(params: { skip?: number; take?: number; where?: any; orderBy?: any }) {
    const { skip, take, where, orderBy } = params;

    // Using the view 'webBoardPost'
    const posts = await this.prisma.webBoardPost.findMany({
      skip,
      take,
      where,
      orderBy,
    });

    return posts.map((post: any) => serialize.serializeWebBoardPost(post));
  }

  /**
   * 게시글 개수 조회
   */
  async count(where?: any) {
    return this.prisma.boardPost.count({ where });
  }

  /**
   * 게시글 상세 조회
   */
  async findOne(id: bigint) {
    // 조회수 증가
    await this.prisma.boardPost.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    // Using the view 'webBoardPostDetail'
    const post = await this.prisma.webBoardPostDetail.findUnique({
      where: { id },
    });

    if (!post) return null;

    return serialize.serializeWebBoardPostDetail(post);
  }

  /**
   * 게시글 생성
   */
  async create(data: any) {
    const post = await this.prisma.boardPost.create({
      data: {
        ...data,
        authorId: data.authorId ? BigInt(data.authorId) : null,
      },
    });

    const created = await this.prisma.webBoardPostDetail.findUnique({
      where: { id: post.id },
    });

    return serialize.serializeWebBoardPostDetail(created);
  }

  /**
   * 게시글 수정
   */
  async update(params: { where: Prisma.BoardPostWhereUniqueInput; data: any }) {
    const { where, data } = params;

    const post = await this.prisma.boardPost.update({
      where,
      data: {
        ...data,
        updatedBy: undefined, // updatedBy field might not exist on BoardPost based on schema check
      },
    });

    const updated = await this.prisma.webBoardPostDetail.findUnique({
      where: { id: post.id },
    });

    return serialize.serializeWebBoardPostDetail(updated);
  }

  /**
   * 게시글 삭제
   */
  async delete(where: Prisma.BoardPostWhereUniqueInput) {
    const post = await this.prisma.boardPost.findUnique({ where });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.boardPost.delete({ where });
  }

  /**
   * 댓글 목록 조회
   */
  async findComments(postId: bigint) {
    const comments = await this.prisma.boardComment.findMany({
      where: { postId: Number(postId) ? BigInt(postId) : postId, parentId: null },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return comments.map((comment: any) => serialize.serializeComment(comment));
  }

  /**
   * 댓글 생성
   */
  async createComment(data: any) {
    const comment = await this.prisma.boardComment.create({
      data: {
        content: data.content,
        postId: BigInt(data.postId),
        parentId: data.parentId ? BigInt(data.parentId) : null,
        authorId: data.authorId ? BigInt(data.authorId) : null,
        guestNickname: data.guestNickname,
        guestPassword: data.guestPassword,
      } as any,
      include: {
        author: true,
      },
    });

    return serialize.serializeComment(comment);
  }
}
