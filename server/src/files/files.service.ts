import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IFile, IRole, IUserFileRecord } from 'src/interfaces';
import { WinstonLoggerService } from 'src/winston-logger.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { UserService } from 'src/user/user.service';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';
import { promisify } from 'util';

const exec = util.promisify(child_process.exec);
const execPromise = promisify(exec);
const deleteFolderUtil = promisify(fs.rm);

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
        const fileName = `${uuidv4()}`;
        const tempImagePath = `uploads/${fileName}`;
        try {
            const writeStream = fs.createWriteStream(tempImagePath);
            writeStream.write(buffer);

            writeStream.on('error', (error) => {
                this.loggerService.error(`Error saving file: ${error}`);
                return `Error saving file: ${error}`;
            });

            writeStream.on('finish', () => {
                this.loggerService.info(`Temporary image saved successfully: ${tempImagePath}`);
            });

            return {originalname, fileName, extension}; 
        } catch (error) {
            this.loggerService.error(`Error saving file: ${error}`);
            return `Error saving file: ${error}`;
        } 
    }
    
    async divideFile(savedFile){
        const pythonScriptPath = 'src/files/scripts/divider.py';
        const gemsFolderPath = path.join(__dirname, '..', '..', 'uploads/',`${savedFile.originalname}-${uuidv4()}${savedFile.extension}`);
        const fileSize = (path.join(__dirname, '..', '..', 'uploads/',`${savedFile.fileName}`));
        const { stdout, stderr } = await execPromise(`python3 ${pythonScriptPath} ${savedFile.fileName} ${savedFile.extension}`) as child_process.ChildProcessWithoutNullStreams;
        if(stderr) {
            this.loggerService.error(`divider.py: ${stderr}`);
            return stderr;
        }
        const gems = JSON.parse(stdout.toString());
        this.loggerService.info(`divider.py: ${gems}`);
        return gems;
    }

    async getUserFiles(userId: ObjectId): Promise<any> {
        return await this.userService.getUserFiles(userId.toString());
    }

    async createFile(userID: ObjectId, file: Express.Multer.File) : Promise<string> {
        const user = await this.userService.findById(userID.toString());
        let savedFile;
        let resultCreateFile;
        let gems;
        if(!user) {
            this.loggerService.error(`createFile: User with ID ${userID} does not exist`)
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }
        // Saving to server
        try{
            savedFile = await this.saveFile(file);

            await new Promise<void>((resolve, reject) => {
                const checkFileExists = setInterval(() => {
                  const fileSize = fs.statSync(path.join(__dirname, '..', '..', 'uploads/', `${savedFile.fileName}`)).size;
                  if (fileSize > 0) {
                    clearInterval(checkFileExists);
                    resolve();
                  }
                }, 100);
          
                setTimeout(() => {
                  clearInterval(checkFileExists);
                  reject(new Error('File was not saved'));
                }, 10000);
            });
            // creating gems and deleting temp image
            gems = await this.divideFile(savedFile);
            this.deleteTempFileFromServer(savedFile.fileName)

            this.loggerService.info(`createFile: File ${savedFile.fileName} saved to server`);
        }catch(error){
            this.loggerService.error(`createFile: ${error}`);
            return error;
        }

        // Saving to db
        try{
            const createFileDTO = {
                url: `${savedFile.fileName}${savedFile.extension}`, 
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
            this.deleteTempFileFromServer(savedFile.fileName)
            await deleteFolderUtil(`uploads/${savedFile.fileName}${savedFile.extension}`, { recursive: true });
            this.loggerService.error(`Unable to add file : ${savedFile.fileName} to db. Deleted from server. `);
            return error;
        }
        return resultCreateFile;
    }

    async deleteTempFileFromServer(filename: string): Promise<string> {
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
        // Deleting from server
        try {
            await deleteFolderUtil(`uploads/${file.url}`, { recursive: true });
            this.loggerService.info(`File ${file.url} deleted from server`);
        }catch (error) {
            this.loggerService.error(`Failed to delete ${file.url}: ${error}`);
            return error;
        }
        // Deleting from db
        try{
            await this.userService.deleteUsersFile(fileID);
            await this.fileModel.findByIdAndDelete(fileID);
            this.loggerService.info(`File deleted from db: ${fileID}`);
        }catch(error){
            this.loggerService.error(`Unable to delete file from db: ${error}`);
            return error;
        }
        return file.url;
    }
}
