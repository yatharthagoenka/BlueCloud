import { Post, Controller, Res, HttpStatus, Body } from '@nestjs/common';
import { RegisterDTO, LoginDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { IPayload, IUser } from 'src/interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

    @Post('register')
    async register(@Res() res, @Body() registerDTO: RegisterDTO) {
      try{
        const user : IUser = await this.userService.create(registerDTO);
        const payload : IPayload = {
            username: user.username,
        };
        const token = await this.authService.signPayload(payload);
        return res.status(HttpStatus.OK).json({ user, token });
      }
      catch(error: any){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Invalid request. Try again.' });
      }
    }
    
    @Post('login')
    async login(@Res() res, @Body() loginDTO: LoginDTO) {
      const user = await this.userService.findByLogin(loginDTO);
      const payload : IPayload = {
        username: user.username,
      };
      try{
        const token = await this.authService.signPayload(payload);
        return res.status(HttpStatus.OK).json({ user, token });
      }catch (error: any) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Invalid request. Try again.' });
      }
    }
}