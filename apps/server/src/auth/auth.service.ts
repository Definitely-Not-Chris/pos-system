import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from '@pos/core/entity'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne({ email });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, email: user.email }
    const accessToken = await this.jwtService.signAsync(payload)
    return { accessToken };
  }

  async register(user: User) {
    return this.userService.create(user)
  }
}