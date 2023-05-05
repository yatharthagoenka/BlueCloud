import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonLoggerService } from './winston-logger.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: WinstonLoggerService
  ) {}

  @Get()
  async getHello(): Promise<string> {
    this.loggerService.debug("debug: Successfully called getHello!")
    return this.appService.getHello();
  }

  @Get('pytest')
  async getPythonTest(): Promise<string> {
    try {
      const response = await axios.get('http://flask-service:5000/');
      return response.data;
    } catch (error) {
      this.loggerService.error(error);
      return 'Flask: ' + error.message;
    }
  }
}
