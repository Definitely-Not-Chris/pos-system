import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, SignInUserDto } from '@pos/core/dtos'
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@pos/core/entities'
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signIn({ email, password }: SignInUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({ email });

    if(!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email } 
    const accessToken = await this.jwtService.signAsync(
      payload, 
      { secret: this.configService.get('JWT_SECRET_KEY') }
    )
    return { accessToken };
  }

  async register(dto: RegisterUserDto) {
    dto.password = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create(dto)
    return await user.save()
  }

  async getUserByToken(token: string): Promise<UserEntity> {
    const payload = await this.jwtService.verifyAsync(
      token,
      { secret: this.configService.get('JWT_SECRET_KEY') }
    );

    const user = await this.userRepository.findOneBy({ id: payload.id })
    return user
  }
}