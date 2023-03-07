import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRole } from 'src/interfaces';
import { RoleDTO } from '../dto/role.dto';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class AuthController {
    constructor(
        private roleService: RoleService,
    ) {}

    @Post('create')
    async create(@Body() roleDTO: RoleDTO) {
        const role : IRole = await this.roleService.create(roleDTO);
        return { role };
    }

    @Get('getAll')
    @UseGuards(AuthGuard("jwt"))
    async getAll(@Res() res) {
        const roles : IRole[] = await this.roleService.getAllROles();
        return res.status(HttpStatus.OK).json(roles);
    }

}