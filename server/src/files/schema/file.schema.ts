import * as mongoose from 'mongoose';
import { IRole } from 'src/interfaces';

export const FileSchema = new mongoose.Schema({
    role: {
      type: String,
      enum: [IRole.VIEWER, IRole.EDITOR, IRole.OWNER],
      required: true,
    },
    gems: [
      {
        index: {
          type: Number,
          required: true,
        },
        name: {
            type: String,
            required: true,
        }
      },
    ],
});
