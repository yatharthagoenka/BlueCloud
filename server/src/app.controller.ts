import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonLoggerService } from './winston-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: WinstonLoggerService
  ) {}

  @Get()
  getHello(): string {
    console.log("debug: Successfully called getHello!")
    return this.appService.getHello();
  }
}
