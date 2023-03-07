import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IRole } from 'src/interfaces';
import { FileSchema } from 'src/files/schema/file.schema';

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
    files:[FileSchema],
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