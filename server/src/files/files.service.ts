import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IFile } from 'src/interfaces';

@Injectable()
export class FilesService {
    constructor(@InjectModel('Files') private readonly fileModel: Model<IFile>) { }

    async getUserFiles(userId: ObjectId): Promise<IFile[]> {
        const Files = await this.fileModel.find({}).exec();
        return Files;
    }
}
