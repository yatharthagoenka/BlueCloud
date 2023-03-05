import { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id: ObjectId
    username?: string
    email: string
    password: string
    files?: {
        _id: ObjectId
        gems:{
            documentID: ObjectId
            index: number
        }[]
    }[]
    createdAt: number
}

export interface IPayload{
    username:string
}