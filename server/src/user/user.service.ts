import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../authentication/dto/auth.dto';
import * as mongoose from 'mongoose';
import { IPayload, IUser } from 'src/interfaces';

@Injectable()
export class UserService {
  constructor( @InjectModel('User') private userModel: Model<IUser>) {}

  async create(registerDTO: RegisterDTO) : Promise<IUser> {
    const { email } = registerDTO;
    const user = await this.userModel.findOne({ email });
    if(user){
      throw new HttpException('User already exists with given email', HttpStatus.BAD_REQUEST);
    }
    const createdUser : IUser = new this.userModel(registerDTO);
    return await createdUser.save();
  }

  async findByLogin(UserDTO: LoginDTO) : Promise<IUser> {
    const { username, password } = UserDTO;
    const user : IUser = await this.userModel
      .findOne({ username })
      .select('username email password files');
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

  async getUserFiles(id: string){
    const userID = { _id: new ObjectId(id) };
    return await this.userModel.findById(userID).select('files');
  }

  async editUser(id: string, payload: any){
    const userID = { _id: new ObjectId(id) };
    const editedUser = await this.userModel.findByIdAndUpdate(userID, payload, { new: true });
    return editedUser;
  }
}