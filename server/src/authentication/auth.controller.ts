import { Body, Controller, Post } from '@nestjs/common';
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
    async register(@Body() registerDTO: RegisterDTO) {
        const user : IUser = await this.userService.create(registerDTO);
        const payload : IPayload = {
            username: user.username,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
    
    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
      const user : IUser = await this.userService.findByLogin(loginDTO);
      const payload : IPayload = {
        username: user.username,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }

}