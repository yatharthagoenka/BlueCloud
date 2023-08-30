import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}
  async getHello(): Promise<string> {
    return `Listening on ${process.env.SERVER_HOST} : ${process.env.SERVER_PORT}`;
  }

  async getPlatformMetrics(): Promise<Object> {
    return this.userService.getPlatformMetrics();
  }
}
