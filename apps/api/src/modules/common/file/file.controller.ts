/**
 * Description : file.controller.ts - 📌 파일 업로드 API Controller
 * Author : Agape Care AI
 */

import { fileContract } from '@agape-care/api-contract';
import { Controller, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { FileService } from './file.service';

@ApiTags('Common - Files')
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: '단일 파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @TsRestHandler(fileContract.uploadFile)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    return tsRestHandler(fileContract.uploadFile, async () => {
      const data = await this.fileService.uploadFile(file);
      return {
        status: 201,
        body: {
          success: true,
          data: data as any,
        },
      };
    });
  }

  @ApiOperation({ summary: '다중 파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @TsRestHandler(fileContract.uploadFiles)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: any[]) {
    return tsRestHandler(fileContract.uploadFiles, async () => {
      const data = await this.fileService.uploadMultiple(files);
      return {
        status: 201,
        body: {
          success: true,
          data: data as any,
        },
      };
    });
  }
}
