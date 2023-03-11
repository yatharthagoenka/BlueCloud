import { Controller, Get, Post, Put, Delete, UseGuards, Res, HttpStatus, Query, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';
import { IFile } from 'src/interfaces';
import { FilesService } from './files.service';
import { UserService } from '../user/user.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WinstonLoggerService } from 'src/winston-logger.service';


@Controller('files')
export class FilesController {

    constructor(
      private filesService: FilesService,
      private readonly loggerService: WinstonLoggerService
    ){}
    
    @Get('/userFiles')
    @UseGuards(AuthGuard("jwt"))
    async getUserFiles(@Res() res, @Query('userID', new ValidateObjectId()) userID): Promise<IFile[]> {
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
}
