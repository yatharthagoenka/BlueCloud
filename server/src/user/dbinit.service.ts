import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IRole, IUser } from '../interfaces';

const sampleUsers = [
  { email: 'uh@gmail.com', username: 'uh', password: '111', createdAt: Date.now()},
  { email: 'yg@gmail.com', username: 'yg', password: '111', createdAt: Date.now()},
];

@Injectable()
export class DBInitService implements OnModuleInit {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    // @InjectModel('Role') private readonly roleModel: Model<IRole>,
  ) {}

  async onModuleInit() {
    if (process.env.DB_INIT === 'true') {
      await this.userModel.collection.drop();

      // const sampleRoles = [
      //   { name: 'viewer'},
      //   { name: 'editor'},
      //   { name: 'owner'},
      // ];

      for (const user of sampleUsers) {
        await this.userModel.create(user);
      }


      // for (const role of sampleRoles) {
      //   await this.roleModel.create(role);
      // }

      console.log('Database initialization complete');
    }
  }
}
