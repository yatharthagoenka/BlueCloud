import { Controller, Get, Post, Put, Delete, UseGuards, Res, HttpStatus, Query, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';
import { IFile } from 'src/interfaces';
import { FilesService } from './files.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WinstonLoggerService } from 'src/winston-logger.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { extname } from 'path';

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
      const filepath = await this.saveFile(file);
      return res.status(HttpStatus.OK).json({res: filepath});
    }

    async saveFile(file): Promise<string> {
      const { buffer, originalname } = file;
      const extension = extname(originalname);
      const fileName = `${uuidv4()}${extension}`;
      const path = `uploads/${fileName}`;
  
          try {
              const writeStream = fs.createWriteStream(path);
              writeStream.write(buffer);
  
              writeStream.on('error', (error) => {
                  this.loggerService.error(`Error saving file: ${error}`);
                  return `Error saving file: ${error}`;
              });
  
              writeStream.on('finish', () => {
                  this.loggerService.info(`File saved successfully: ${path}`);
                });
            return path; 
          } catch (error) {
              this.loggerService.error(`Error saving file: ${error}`);
              return `Error saving file: ${error}`;
          }
          
  }
  
}
