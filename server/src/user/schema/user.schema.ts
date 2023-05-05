import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IRole } from 'src/interfaces';

export const userFileRecord = new mongoose.Schema({
    originalname:{
        type:String,
        required:true,
    },
    fileID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
        required: true,
    },
    size:{
        type: Number
    },
    role: [{
        type: String,
        enum: [IRole.VIEWER, IRole.EDITOR, IRole.OWNER],
        required: true,
    }]
});

export const userActivityRecord = new mongoose.Schema({
    time:{
        type: Date,
    },
    action:{
        type: String,
    },
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
    storage:{
        type:Number,
        default: 0,
    },
    activity: [userActivityRecord],
    files:[userFileRecord],
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