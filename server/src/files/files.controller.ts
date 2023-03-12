import { Controller, Get, Post, Put, Delete, UseGuards, Res, HttpStatus, Query, UploadedFiles, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';
import { FileDTO } from 'src/interfaces';
import { FilesService } from './files.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WinstonLoggerService } from 'src/winston-logger.service';


@Controller('files')
export class FilesController {

    constructor(
      private filesService: FilesService,
      private readonly loggerService: WinstonLoggerService
    ){}

    @Post('/upload')
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File, @Query('userID', new ValidateObjectId()) userID) {
      const filepath = await this.filesService.createFile(userID, file);
      return res.status(HttpStatus.OK).json({res: filepath});
    }

    @Delete('/:filename')
    @UseGuards(AuthGuard("jwt"))
    async deleteFile(@Query('fileID', new ValidateObjectId()) fileID, @Body() file: FileDTO, @Res() res) {
      try {
        await this.filesService.deleteFile(fileID);
        return res.status(HttpStatus.OK).json({ message: 'File deleted successfully' });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting file' });
      }
    }
}
