import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IFile } from 'src/interfaces';
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
    
    async getUserFiles(userId: ObjectId): Promise<IFile[]> {
        const Files = await this.fileModel.find({}).exec();
        return Files;
    }

    async createFile(userID: ObjectId, file: Express.Multer.File) : Promise<string> {
        const user = await this.userService.findById(userID.toString());
        let filepath = '';
        if(!user) {
            this.loggerService.error(`User with ID ${userID} does not exist`)
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }

        try{
            filepath = await this.saveFile(file);
            this.loggerService.info(`File saved successfully: ${filepath}`);
        }catch(error){
            this.loggerService.error(error);
            return error;
        }
        try{
            const userFile = {
                url: filepath,
                role: "OWNER EDITOR VIEWER"
            }
            await this.userService.editUser(userID.toString(), { files: userFile });
            this.loggerService.info(`File ${filepath} added to user profile`);
        }catch(error){
            // call delete file function
            this.loggerService.error(`Unable to update user with ${filepath}`);
            return error;
        }
        // return filepath;
    }
}
