import { Module, Options } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { WinstonLoggerService } from './winston-logger.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        dbName: process.env.DB_NAME,
      }),
    }),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [WinstonLoggerService, AppService],
})
export class AppModule {}
