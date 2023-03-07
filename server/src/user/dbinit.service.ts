import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserService } from './user.service';

const sampleUsers = [
  { email: 'uh@gmail.com', username: 'uh', password: '111', createdAt: Date.now()},
  { email: 'yg@gmail.com', username: 'yg', password: '111', createdAt: Date.now()},
];

@Injectable()
export class DBInitService implements OnModuleInit {
  constructor(
    @InjectConnection() private connection: Connection,
    private userService: UserService
  ) {}

  async onModuleInit() {
    if (process.env.DB_INIT === 'true') {
      await this.connection.dropCollection('users');

      for (const user of sampleUsers) {
        await this.userService.create(user);
        console.log(`User created: ${user.username}`);
      }

      console.log('Database initialization complete');
    }
  }
}
