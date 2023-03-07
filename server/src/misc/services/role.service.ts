import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IRole } from 'src/interfaces';
import { RoleDTO } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor( @InjectModel('Role') private roleModel: Model<IRole>) {}

  async create(roleDTO: RoleDTO) : Promise<IRole> {
    const { name } = roleDTO;
    const user = await this.roleModel.findOne({ name });
    if(user){
      throw new HttpException('ROle already exists with given name', HttpStatus.BAD_REQUEST);
    }
    const createdRole = new this.roleModel(roleDTO);
    return await createdRole.save();
  }

  async getAllROles(): Promise<IRole[]> {
    const Roles = await this.roleModel.find().exec();
    return Roles;
  }

  async findById(id: string) : Promise<IRole> {
    const roleID = { _id: new ObjectId(id) };
    return await this.roleModel.findById(roleID);
  }

  async findByName(name: string) : Promise<IRole> {
    return await this.roleModel.findOne({name: name});
  }
}