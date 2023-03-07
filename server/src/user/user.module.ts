import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBInitService } from './dbinit.service';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    providers: [UserService, DBInitService],
    exports: [UserService],
})
export class UserModule {}