import { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id: ObjectId
    username?: string
    email: string
    password: string
    files?: IUserFileRecord[]
    createdAt: Date
}

export enum IRole{
    VIEWER = 'viewer',
    EDITOR = 'editor',
    OWNER = 'owner',
}

export interface IUserFileRecord{
    originalname: string
    fileID: ObjectId
    role: IRole[]
}

export interface IFile{
    originalname: string
    uuid: string
    pub_key: string
    ownerID: ObjectId
    gems?:{
        index: number
        enc: string
    }[]
}

export interface IPayload{
    username:string
}

export interface FileDTO{
    url: string
}