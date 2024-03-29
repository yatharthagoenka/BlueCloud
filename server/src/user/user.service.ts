import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../authentication/dto/auth.dto';
import { IFile, IPayload, IUser } from 'src/interfaces';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UserService {
  constructor( 
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Files') private fileModel: Model<IFile>,
    private readonly filesService: FilesService
    ) {}

  async create(registerDTO: RegisterDTO) : Promise<IUser> {
    const { username } = registerDTO;
    const user = await this.userModel.findOne({ username });
    if(user){
      throw new HttpException('User already exists with given username', HttpStatus.BAD_REQUEST);
    }
    const createdUser : IUser = new this.userModel(registerDTO);
    createdUser.storage = 0;
    return await createdUser.save();
  }

  async findByLogin(UserDTO: LoginDTO) : Promise<IUser> {
    const { username, password } = UserDTO;
    const user : IUser = await this.userModel
      .findOne({ username })
      .select('username name email password');
    if(!user) {
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
    }
    if(await bcrypt.compare(password, user.password)) {
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

  async editUser(id: string, payload: any){
    const userID = { _id: new ObjectId(id) };
    if(payload.password){
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;
    }
    const editedUser = await this.userModel.findByIdAndUpdate(userID, payload);
    return editedUser;
  }

  async updateUserStorage(userID: string, size: any, operation: Number){
    const user = await this.userModel.findById(userID);
    const updatedStorage = user.storage + (operation?size:-size);
    await this.userModel.updateOne(
      { _id: userID },
      { $set: { storage: updatedStorage } }
    );
  }

  async deleteUser(userID: ObjectId, password: string){
    const user = await this.userModel.findById(userID);
    if(!user) {
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
    }
    if(await bcrypt.compare(password, user.password)) {
      try{
        const files = await this.fileModel.find({ 'users': { $elemMatch: { userID: userID, role: 'owner' } } });
        for(let file of files) {
          await this.filesService.delete(userID, new ObjectId(file._id));
        }
        await this.userModel.findByIdAndDelete(userID);
        return user;
      }catch(error){
        throw new HttpException(error.message, error.status);
      }
    }else{
      throw new HttpException('Invalid credentials. Try again', HttpStatus.UNAUTHORIZED);
    }
  }

  async getPlatformMetrics(): Promise<Object>{
    const metricsEntity = {
      userCount: 0,
      fileCount: 0, 
      activeHours: 0, 
      storageUsed: 0
    }
    metricsEntity.userCount = await this.userModel.count();
    metricsEntity.fileCount = await this.fileModel.countDocuments();
    let storageFinder = await this.fileModel.aggregate([
      {
        $group: {
          _id: null,
          totalSize: {
            $sum: "$size"
          }
        }
      }
    ]).exec();
    metricsEntity.storageUsed = Number((storageFinder[0]?.totalSize/1000).toFixed(2)); // MBs    
    const activeSince = new Date('2023-03-20T00:00:00');
    const currentDate = new Date();
    const timeDifference = (currentDate.valueOf() - activeSince.valueOf());
    metricsEntity.activeHours = Math.round(timeDifference / (1000 * 60 * 60));
    return metricsEntity;
  }
}