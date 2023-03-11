import { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id: ObjectId
    username?: string
    email: string
    password: string
    files?: [IFile]
    createdAt: Date
}

export enum IRole{
    VIEWER = 'viewer',
    EDITOR = 'editor',
    OWNER = 'owner',
}

export interface IFile{
    _id: ObjectId
    url: string
    role: [IRole]
    gems?:{
        _id: ObjectId
        index: number
        name: string
    }[]
}

export interface IPayload{
    username:string
}