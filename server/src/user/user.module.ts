import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { WinstonLoggerService } from 'src/winston-logger.service';
import { DBInitService } from './dbinit.service';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        forwardRef(() => FilesModule),
    ],
    providers: [UserService, DBInitService, WinstonLoggerService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}