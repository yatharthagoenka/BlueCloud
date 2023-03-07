import { Module, Options } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MiscModule } from './misc/misc.module';
import { DBInitService } from './user/dbinit.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    MiscModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_CONN_STRING,
        dbName: process.env.MONGODB_NAME,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
