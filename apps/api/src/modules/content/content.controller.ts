import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BoardService } from './board/board.service';
import { ContentService } from './content.service';
import { PopupService } from './popup/popup.service';

@Controller('content')
@UseGuards(JwtAuthGuard)
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly boardService: BoardService,
    private readonly popupService: PopupService,
  ) {}

  @Get()
  getHello() {
    return this.contentService.getHello();
  }

  // --- Popup Endpoints ---

  @Post('popups')
  createPopup(@Body() data: Prisma.PopupBannerCreateInput) {
    return this.popupService.createPopup(data);
  }

  @Get('popups')
  findAllPopups(@Query('skip') skip?: string, @Query('take') take?: string, @Query('isActive') isActive?: string) {
    const where: Prisma.PopupBannerWhereInput = {};

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    return this.popupService.findAllPopups({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('popups/active')
  findActivePopups() {
    return this.popupService.findActivePopups();
  }

  @Get('popups/:id')
  findOnePopup(@Param('id') id: string) {
    return this.popupService.findOnePopup({ id: BigInt(id) });
  }

  @Patch('popups/:id')
  updatePopup(@Param('id') id: string, @Body() data: Prisma.PopupBannerUpdateInput) {
    return this.popupService.updatePopup({
      where: { id: BigInt(id) },
      data,
    });
  }

  @Delete('popups/:id')
  deletePopup(@Param('id') id: string) {
    return this.popupService.deletePopup({ id: BigInt(id) });
  }

  // --- Board Endpoints ---

  @Post('board/posts')
  createPost(@Body() data: Prisma.BoardPostCreateInput) {
    return this.boardService.createPost(data);
  }

  @Get('board/:boardKey/posts')
  findAllPosts(
    @Param('boardKey') boardKey: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('query') query?: string,
  ) {
    const where: Prisma.BoardPostWhereInput = {
      boardKey,
    };
    if (query) {
      where.OR = [{ title: { contains: query, mode: 'insensitive' } }, { content: { contains: query, mode: 'insensitive' } }];
    }

    return this.boardService.findAllPosts({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('board/posts/:id')
  findOnePost(@Param('id') id: string) {
    return this.boardService.findOnePost({ id: BigInt(id) });
  }

  @Patch('board/posts/:id')
  updatePost(@Param('id') id: string, @Body() data: Prisma.BoardPostUpdateInput) {
    return this.boardService.updatePost({
      where: { id: BigInt(id) },
      data,
    });
  }

  @Delete('board/posts/:id')
  deletePost(@Param('id') id: string) {
    return this.boardService.deletePost({ id: BigInt(id) });
  }

  @Post('board/comments')
  createComment(@Body() data: Prisma.BoardCommentCreateInput) {
    return this.boardService.createComment(data);
  }

  @Delete('board/comments/:id')
  deleteComment(@Param('id') id: string) {
    return this.boardService.deleteComment({ id: BigInt(id) });
  }
}
