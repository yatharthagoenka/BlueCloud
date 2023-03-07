import { Controller, Get, Post, Put, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { IRole } from 'src/interfaces';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(
        private filesService: FilesService
    ){}
    
    @Get('/all')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(IRole.OWNER)
    async getMyFiles(@Res() res) {
        const contacts = await this.filesService.getAllFiles();
        return res.status(HttpStatus.OK).json(contacts);
    }
}
