import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFile } from 'src/interfaces';

@Injectable()
export class FilesService {
    constructor(@InjectModel('Files') private readonly fileModel: Model<IFile>) { }

    async getAllFiles(): Promise<IFile[]> {
        const Files = await this.fileModel.find().exec();
        return Files;
    }
}
