import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    }
})
