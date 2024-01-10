import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IRole } from 'src/interfaces';

export const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
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
    storage:{
        type:Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
    toJSON: {
      transform: (_, ret) => {
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
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