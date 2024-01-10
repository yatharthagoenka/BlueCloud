import * as mongoose from 'mongoose';
import { IRole } from 'src/interfaces';

export const usersRecord = new mongoose.Schema({
  userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  role: [{
    type: String,
    enum: [IRole.VIEWER, IRole.EDITOR, IRole.OWNER],
    required: true,
  }]
});

export const FileSchema = new mongoose.Schema({
    originalname:{
      type: String,
      required: true,
    },
    uuid:{
      type: String,
      required: true,
    },
    rsa_priv_base64:{
      type: String,
    },
    size:{
      type: Number,
    },
    users: [usersRecord],
    createdAt: {
      type: Date,
      default: Date.now,
    },
});
