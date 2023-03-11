import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonLoggerService } from 'src/winston-logger.service';
import { DBInitService } from './dbinit.service';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    providers: [UserService, DBInitService, WinstonLoggerService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}