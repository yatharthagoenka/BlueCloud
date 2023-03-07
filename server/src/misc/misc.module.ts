import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './misc.schema';
import { RoleService } from './services/role.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
    providers: [RoleService],
    exports: [RoleService],
})
export class MiscModule {}