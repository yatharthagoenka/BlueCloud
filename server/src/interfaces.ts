import { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id: ObjectId
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    storage?: number
    createdAt: Date
}

export enum IRole{
    VIEWER = 'viewer',
    EDITOR = 'editor',
    OWNER = 'owner',
}

export interface IFileUsersAccess{
    userID: ObjectId,
    role: IRole
}

export interface IFile{
    originalname: string
    uuid: string
    rsa_priv_base64: string
    size?: number
    users: IFileUsersAccess[]
    createdAt: Date
}

export interface IPayload{
    username:string
    email:string
}

export interface FileDTO{
    url: string
}