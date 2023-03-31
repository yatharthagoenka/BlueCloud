import { sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IPayload } from 'src/interfaces';


@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  
  async signPayload(payload: IPayload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '3d' });
  }

  async validateUser(payload: IPayload) {
    return await this.userService.findByPayload(payload);
  }
}
