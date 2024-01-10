import { Controller, Get, Post, Delete, UseGuards, Res, HttpStatus, Query, UploadedFiles, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';
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

    @Get('/user')
    @UseGuards(AuthGuard("jwt"))
    async getUserFiles(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
      const files = await this.filesService.getUserFiles(userID);
      return res.status(HttpStatus.OK).json({files: files});
    }

    @Get('/getKey')
    @UseGuards(AuthGuard("jwt"))
    async getRSABase64(@Res() res, @Query('userID', new ValidateObjectId()) userID, @Query('fileID', new ValidateObjectId()) fileID) {
      try{
        const rsa_base64_key = await this.filesService.getRSABase64(userID, fileID);
        return res.status(HttpStatus.OK).json({"value": rsa_base64_key});
      }catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }

    @Post('/upload')
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File, @Query('userID', new ValidateObjectId()) userID) {
      try{
        const savedFile = await this.filesService.createFile(userID, file);
        return res.status(HttpStatus.OK).json(savedFile);
      }catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }

    @Get('/download')
    @UseGuards(AuthGuard("jwt"))
    async downloadFile(@Res() res, @Query('fileID', new ValidateObjectId()) fileID,  @Query('user_priv_base64') user_priv_base64) {
      try {
        const file = await this.filesService.downloadFile(fileID, user_priv_base64);
        res.status(HttpStatus.OK).download(file);
        return await this.filesService.clearCachedFile(fileID);
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }
    
    @Delete('')
    @UseGuards(AuthGuard("jwt"))
    async deleteFile(
      @Query('fileID', new ValidateObjectId()) fileID,
      @Query('userID', new ValidateObjectId()) userID,
      @Res() res
      ) {
      try {
        await this.filesService.delete(userID, fileID);
        return res.status(HttpStatus.OK).json({ message: 'File deleted successfully' });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }
}
