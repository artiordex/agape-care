import { Prisma } from '@agape-care/database';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnnouncementService } from './announcement/announcement.service';
import { BoardService } from './board/board.service';
import { ContentService } from './content.service';
import { GalleryService } from './gallery/gallery.service';
import { PopupService } from './popup/popup.service';

@Controller('content')
@UseGuards(JwtAuthGuard)
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly boardService: BoardService,
    private readonly popupService: PopupService,
    private readonly announcementService: AnnouncementService,
    private readonly galleryService: GalleryService,
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

  @Public()
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

  @Public()
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

  @Public()
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

  // --- Notice Endpoints ---

  @Post('notices')
  createNotice(@Body() data: any) {
    // BigInt fields like createdBy should be handled if present in data
    return this.announcementService.createAnnouncement(data);
  }

  @Public()
  @Get('notices')
  findAllNotices(@Query('category') category?: string, @Query('isActive') isActive?: string) {
    const where: Prisma.NoticeWhereInput = {};
    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    return this.announcementService.findAllAnnouncements({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Public()
  @Get('notices/:id')
  findOneNotice(@Param('id') id: string) {
    return this.announcementService.findOneAnnouncement({ id: BigInt(id) });
  }

  @Patch('notices/:id')
  updateNotice(@Param('id') id: string, @Body() data: any) {
    return this.announcementService.updateAnnouncement({
      where: { id: BigInt(id) },
      data,
    });
  }

  @Delete('notices/:id')
  deleteNotice(@Param('id') id: string) {
    return this.announcementService.deleteAnnouncement({ id: BigInt(id) });
  }

  // --- Gallery Endpoints ---

  @Post('gallery')
  createGalleryItem(@Body() data: any) {
    return this.galleryService.createGalleryItem(data);
  }

  @Public()
  @Get('gallery')
  findAllGalleryItems(@Query('isPublic') isPublic?: string) {
    const where: Prisma.GalleryItemWhereInput = {};
    if (isPublic !== undefined) where.isPublic = isPublic === 'true';

    return this.galleryService.findAllGalleryItems({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Public()
  @Get('gallery/:id')
  findOneGalleryItem(@Param('id') id: string) {
    return this.galleryService.findOneGalleryItem({ id: BigInt(id) });
  }

  @Patch('gallery/:id')
  updateGalleryItem(@Param('id') id: string, @Body() data: any) {
    return this.galleryService.updateGalleryItem({
      where: { id: BigInt(id) },
      data,
    });
  }

  @Delete('gallery/:id')
  deleteGalleryItem(@Param('id') id: string) {
    return this.galleryService.deleteGalleryItem({ id: BigInt(id) });
  }
}
