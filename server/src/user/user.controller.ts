import { Controller, Get, Res, HttpStatus, NotFoundException, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';
import { UserService } from 'src/user/user.service';
import { WinstonLoggerService } from 'src/winston-logger.service';
    
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService, 
        private loggerService: WinstonLoggerService,
    ) {}
    
    @Get()
    @UseGuards(AuthGuard("jwt"))
    async getUser(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
        const user = await this.userService.findById(userID);
        if (!user) {
            this.loggerService.error(`User with ID ${userID} does not exist!`);
            throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Patch('/edit')
    @UseGuards(AuthGuard("jwt"))
    async editUser(@Res() res, @Query('userID', new ValidateObjectId()) userID, @Body() editUserDTO){
        const editedUser = await this.userService.editUser(userID, editUserDTO);
        if (!editedUser) {
            this.loggerService.error(`User with ID ${userID} does not exist!`);
            throw new NotFoundException(`User with ID ${userID} does not exist!`);
        }
        return res.status(HttpStatus.OK).json({
            message: 'User has been updated',
            contact: editedUser,
        });
    }

}