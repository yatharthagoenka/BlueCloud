import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return `Listening on ${process.env.SERVER_HOST} : ${process.env.SERVER_PORT}`;
  }
}
