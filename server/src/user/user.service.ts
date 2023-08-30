import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../authentication/dto/auth.dto';
import { IPayload, IUser, IActivityAction, IUserActivityRecord } from 'src/interfaces';

@Injectable()
export class UserService {
  constructor( @InjectModel('User') private userModel: Model<IUser>) {}

  async create(registerDTO: RegisterDTO) : Promise<IUser> {
    const { username } = registerDTO;
    const user = await this.userModel.findOne({ username });
    if(user){
      throw new HttpException('User already exists with given username', HttpStatus.BAD_REQUEST);
    }
    const createdUser : IUser = new this.userModel(registerDTO);
    const activityRecord = {
        time: new Date(),
        action: IActivityAction.REGISTER
    }
    createdUser.storage = 0;
    createdUser.activity.push(activityRecord)
    return await createdUser.save();
  }

  async findByLogin(UserDTO: LoginDTO) : Promise<IUser> {
    const { username, password } = UserDTO;
    const user : IUser = await this.userModel
      .findOne({ username })
      .select('username email password');
    if(!user) {
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
    }
    if(await bcrypt.compare(password, user.password)) {
      const activityRecord : IUserActivityRecord = {
        time: new Date(),
        action: IActivityAction.LOGIN
      }
      await this.userModel.updateOne(
        { _id: user._id },
        { $push: {
          activity: {
            $each: [activityRecord],
            $slice: -5
          }
        }}
      );
      return user;
    }else{
      throw new HttpException('Invalid credentials. Try again', HttpStatus.BAD_REQUEST);
    }
  }
    
  async findById(id: string) : Promise<IUser> {
    const userID = { _id: new ObjectId(id) };
    return await this.userModel.findById(userID);
  }

  async findByPayload(payload: IPayload) : Promise<IUser> {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }

  async getUserFiles(id: string){
    const userID = { _id: new ObjectId(id) };
    return await this.userModel.findById(userID).select('files');
  }

  async getUserActivity(userID: ObjectId){
    const user = await this.userModel.findById(userID).select('activity');
    const recentActivity = user.activity?.sort((a, b) => b.time.getTime() - a.time.getTime());
    return recentActivity;
  }

  async getLargestFiles(userID: ObjectId){
    const user = await this.userModel.findById(userID).select('files');
    const largestFiles = user.files.sort((a, b) => b.size - a.size).slice(0, 5);
    return largestFiles;
  }

  async editUser(id: string, payload: any){
    const userID = { _id: new ObjectId(id) };
    const editedUser = await this.userModel.findByIdAndUpdate(userID, {[payload.field]: payload.value});
    return editedUser;
  }

  async addFileToUser(userID: string, file: any){
    const user = await this.userModel.findById(userID);
    const updatedStorage = user.storage + file.size;
    const activityRecord : IUserActivityRecord = {
      time: new Date(),
      action: IActivityAction.UPLOAD
    }
    await this.userModel.updateOne(
      { _id: userID },
      { $push: { 
          files: file, 
          activity: {
            $each: [activityRecord],
            $slice: -5
          } 
        }, 
        $set: { storage: updatedStorage } }
    );
  }

  async revokeFileAccess(userID: ObjectId, fileID: ObjectId){
    await this.userModel.updateOne(
      {
        _id: userID,
        'files.fileID': fileID
      },
      {
        $set: { 'files.$.access': 0 }
      }
    )
  }

  async deleteUsersFile(userID: ObjectId, fileID: ObjectId, size: number){
    await this.userModel.updateMany(
      { files: { $elemMatch: { fileID: fileID } } },
      { $pull: { files: { fileID: fileID } } }
    );
    const user = await this.userModel.findById(userID);
    const updatedStorage = user.storage - size;
    await this.userModel.updateOne(
      { _id: userID },
      { $set: {storage: updatedStorage} }
    );
  }

  async getPlatformMetrics(): Promise<Object>{
    const metricsEntity = {
      userCount: 0,
      fileCount: 0, 
      activeHours: 0, 
      storageUsed: 0
    }
    metricsEntity.userCount = await this.userModel.count();
    let obj = await this.userModel.aggregate([
      {
        $project: {
          fileArraySize: { $size: "$files" },
          userStorageUsed: "$storage"
        }
      },
      {
        $group: {
          _id: null,
          fileCount: { $sum: "$fileArraySize" },
          storageUsed: { $sum: "$userStorageUsed" }
        }
      }
    ]);
    metricsEntity.fileCount = obj[0].fileCount;
    metricsEntity.storageUsed = Math.round(obj[0].storageUsed / 1000 * 1000);
    const activeSince = new Date('2023-03-20T00:00:00');
    const currentDate = new Date();

    const timeDifference = (currentDate.valueOf() - activeSince.valueOf());
    metricsEntity.activeHours = Math.round(timeDifference / (1000 * 60 * 60));
    return metricsEntity;
  }
}