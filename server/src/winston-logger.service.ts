import { createLogger, transports, format } from 'winston';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WinstonLoggerService {
  private readonly logger = createLogger({
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.combine(format.colorize(), format.simple()),
      }),
      new transports.File({
        filename: 'logs/app.log',
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.errors({ stack: true }),
          format.splat(),
          format.json(),
        ),
      }),
    ],
  });

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  info(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { context, trace });
  }
}
