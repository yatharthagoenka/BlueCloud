import { Controller, Get, Post, Put, Delete, UseGuards, Res, HttpStatus, Query, UploadedFiles, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';
import { FileDTO, IRole } from 'src/interfaces';
import { FilesService } from './files.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WinstonLoggerService } from 'src/winston-logger.service';
// import { CheckUserRole } from './role.decorator';


@Controller('files')
export class FilesController {

    constructor(
      private filesService: FilesService,
      private readonly loggerService: WinstonLoggerService
    ){}

    @Get('/user')
    @UseGuards(AuthGuard("jwt"))
    async getUserFiles(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
        const files = await this.filesService.getUserFiles(userID);
        return res.status(HttpStatus.OK).json(files);
    }

    @Post('/upload')
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File, @Query('userID', new ValidateObjectId()) userID) {
      const filepath = await this.filesService.createFile(userID, file);
      return res.status(HttpStatus.OK).json({res: filepath});
    }

    @Delete('')
    @UseGuards(AuthGuard("jwt"))
    async deleteFile(
      @Query('userID', new ValidateObjectId()) userID, 
      @Query('fileID', new ValidateObjectId()) fileID, 
      @Res() res,
      // @CheckUserRole({ userIDKey: 'userID', fileIDKey: 'fileID', requiredRole: IRole.OWNER }) userFile: { userID: string; fileID: string },
      ) {
      try {
        await this.filesService.deleteFile(fileID);
        return res.status(HttpStatus.OK).json({ message: 'File deleted successfully' });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting file' });
      }
    }
}
