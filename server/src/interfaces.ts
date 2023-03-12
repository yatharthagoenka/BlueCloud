import { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id: ObjectId
    username?: string
    email: string
    password: string
    files?: IFile[]
    createdAt: Date
}

export enum IRole{
    VIEWER = 'viewer',
    EDITOR = 'editor',
    OWNER = 'owner',
}

export interface IUserFileRecord{
    fileID: ObjectId
    role: IRole[]
}

export interface IFile{ 
    _id: ObjectId
    url: string
    ownerID: ObjectId
    gems?:{
        _id: ObjectId
        index: number
        enc: string
        name: string
    }[]
}

export interface IPayload{
    username:string
}

export interface FileDTO{
    url: string
}