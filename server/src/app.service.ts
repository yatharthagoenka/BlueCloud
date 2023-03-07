import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Listening on ${process.env.SERVER_HOST} : ${process.env.SERVER_PORT}`;
  }
}
