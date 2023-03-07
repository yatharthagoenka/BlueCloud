import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

var Gems = new mongoose.Schema({
    index: Number
});

export const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    files:[Gems],
    createdAt: Date
})

UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
  });