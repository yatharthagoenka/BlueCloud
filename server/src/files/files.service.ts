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

    async saveFile(file): Promise<any> {
        const { buffer, originalname } = file;
        const extension = extname(originalname);
        const originalnamePrefix = originalname.slice(0, 6);
        const fileName = `${originalnamePrefix}-${uuidv4()}${extension}`;
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
            return {originalname, fileName}; 
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
        let savedFile;
        let resultCreateFile;
        if(!user) {
            this.loggerService.error(`User with ID ${userID} does not exist`)
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }
        // Saving to server
        try{
            savedFile = await this.saveFile(file);
            this.loggerService.info(`File saved to server successfully: ${savedFile.fileName}`);
        }catch(error){
            this.loggerService.error(error);
            return error;
        }
        // Saving to db
        try{
            const createFileDTO = {
                url: savedFile.fileName, 
                ownerID: userID,
                gems: [{
                    index: 0, 
                    url: savedFile.fileName, 
                    enc: "none"
                }]
            }
            // save to filesModel
            const createdFile = new this.fileModel(createFileDTO);
            resultCreateFile = await createdFile.save();
            this.loggerService.debug(`FileID:  ${resultCreateFile._id}`);
            
            // save to usersModel
            const userFileRecord : IUserFileRecord = {
                originalname: savedFile.originalname,
                fileID: resultCreateFile._id,
                role: [IRole.OWNER, IRole.EDITOR, IRole.VIEWER]
            }
            await this.userService.addFileToUser(userID.toString(), userFileRecord);
            this.loggerService.info(`File ${savedFile.fileName} added to db and user profile.`);
        }catch(error){
            this.deleteFileFromServer(savedFile.fileName)
            this.loggerService.error(`Unable to add file : ${savedFile.fileName} to db. Deleted from server. `);
            return error;
        }
        return resultCreateFile;
    }

    async deleteFileFromServer(filename: string): Promise<string> {
        return new Promise(() => {
            fs.unlink(`uploads/${filename}`, (error) => {
              if (error) {
                this.loggerService.error(`While deleting from server: ${error}`);
              } else {
                this.loggerService.info(`File deleted from server: ${filename}`);
              }
            });
        });
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
        this.deleteFileFromServer(file.url);
    }
}
