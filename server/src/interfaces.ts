import { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id: ObjectId
    username: string
    email: string
    password: string
    storage?: number
    activity?: IUserActivityRecord[]
    files?: IUserFileRecord[]
    createdAt: Date
}

export enum IRole{
    VIEWER = 'viewer',
    EDITOR = 'editor',
    OWNER = 'owner',
}

export enum IActivityAction{
    LOGIN = 'login',
    REGISTER = 'register',
    LOGOUT = 'logout',
    UPLOAD = 'upload',
    DELETE = 'delete',
}

export interface IUserFileRecord{
    originalname: string
    fileID: ObjectId
    size?: number
    role: IRole[]
}

export interface IUserActivityRecord{
    time: Date
    action: IActivityAction
}

export interface IFile{
    originalname: string
    uuid: string
    pub_key: string
    size?: number
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