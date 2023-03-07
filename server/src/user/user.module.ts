import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MiscModule } from 'src/misc/misc.module';
import { DBInitService } from './dbinit.service';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports: [
        MiscModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    providers: [UserService, DBInitService],
    exports: [UserService],
})
export class UserModule {}