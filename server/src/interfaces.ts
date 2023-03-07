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

export interface IPayload{
    username:string
}

export interface IRole{
    _id: ObjectId
    name: string
}

export interface IFile{
    _id: ObjectId
    gems:{
        _id: ObjectId
        index: number
    }[]
}