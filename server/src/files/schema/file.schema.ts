import * as mongoose from 'mongoose';
import { IRole } from 'src/interfaces';

export const FileSchema = new mongoose.Schema({
    url:{
      type: String,
      required: true,
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
        url: {
            type: String,
            required: true,
        },
        enc: {
          type: String,
          required: true,
        }
      },
    ],
});
