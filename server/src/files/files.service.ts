import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IFile, IRole, IUserFileRecord } from 'src/interfaces';
import { WinstonLoggerService } from 'src/winston-logger.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { extname } from 'path';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FilesService {
    constructor(
        @InjectModel('Files') private readonly fileModel: Model<IFile>,
        private readonly loggerService: WinstonLoggerService,
        private userService: UserService
    ){}

    async saveFile(file): Promise<string> {
        const { buffer, originalname } = file;
        const extension = extname(originalname);
        const originalName = originalname.slice(0, 6);
        const fileName = `${originalName}-${uuidv4()}${extension}`;
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
            return fileName; 
        } catch (error) {
            this.loggerService.error(`Error saving file: ${error}`);
            return `Error saving file: ${error}`;
        } 
    }
    
    async getUserFiles(userId: ObjectId): Promise<IFile[]> {
        const Files = await this.fileModel.find({ownerID: userId}).exec();
        return Files;
    }

    async createFile(userID: ObjectId, file: Express.Multer.File) : Promise<string> {
        const user = await this.userService.findById(userID.toString());
        let filepath = '';
        let resultCreateFile;
        if(!user) {
            this.loggerService.error(`User with ID ${userID} does not exist`)
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }
        // Saving to server
        try{
            filepath = await this.saveFile(file);
            this.loggerService.info(`File saved to server successfully: ${filepath}`);
        }catch(error){
            this.loggerService.error(error);
            return error;
        }
        // Saving to db
        try{
            const createFileDTO = {
                url: filepath,
                ownerID: userID,
                gems: []
            }
            const createdFile = new this.fileModel(createFileDTO);
            resultCreateFile = await createdFile.save();
            this.loggerService.debug(`FileID:  ${resultCreateFile._id}`);
            const userFileRecord : IUserFileRecord = {
                fileID: resultCreateFile._id,
                role: [IRole.OWNER, IRole.EDITOR, IRole.VIEWER]
            }
            await this.userService.addFileToUser(userID.toString(), userFileRecord);
            this.loggerService.info(`File ${filepath} added to db and user profile.`);
        }catch(error){
            this.deleteFile(resultCreateFile._id);
            this.loggerService.error(`Unable to add file : ${filepath} to db. Deleted from server. `);
            return error;
        }
        return filepath;
    }

    async deleteFile(fileID: ObjectId): Promise<string> {
        const file = await this.fileModel.findById(fileID.toString());
        if(!file) {
            this.loggerService.error(`File with ID ${fileID} does not exist`)
            throw new HttpException('File does not exists', HttpStatus.BAD_REQUEST);
        }
        this.loggerService.debug(`Deleting file: ${file.url}`)
        try{
            await this.userService.deleteUsersFile(fileID);
            await this.fileModel.findByIdAndDelete(fileID);
            this.loggerService.info(`File deleted from db: ${fileID}`);
        }catch(error){
            this.loggerService.error(`Unable to delete file from db: ${error}`);
            return error;
        }
        return new Promise((resolve, reject) => {
          fs.unlink(`uploads/${file.url}`, (error) => {
            if (error) {
              this.loggerService.error(`While deleting from server: ${error}`);
              return reject(error);
            } else {
              this.loggerService.info(`File deleted from server: ${file.url}`);
              return resolve(file.url);
            }
          });
        });
    }
}
