import * as mongoose from 'mongoose';
import { IRole } from 'src/interfaces';

export const FileSchema = new mongoose.Schema({
    originalname:{
      type: String,
      required: true,
    },
    uuid:{
      type: String,
      required: true,
    },
    pub_key:{
      type: String,
    },
    size:{
      type: Number,
    },
    ownerID:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    gems: [
      {
        index: {
          type: Number,
          required: true,
        },
        enc: {
          type: String,
          required: true,
        }
      },
    ],
});
