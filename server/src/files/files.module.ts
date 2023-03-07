import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schema/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Files', schema: FileSchema }])
  ],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
