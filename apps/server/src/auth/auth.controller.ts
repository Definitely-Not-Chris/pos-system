
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    UsePipes
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { RegisterUserSchema, RegisterUserDto, SignInUserSchema, SignInUserDto } from '@pos/core/dtos'
  
  @Controller('/v1/auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ZodValidationPipe(SignInUserSchema))
    signIn(@Body() dto: SignInUserDto) {
      return this.authService.signIn(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    @UsePipes(new ZodValidationPipe(RegisterUserSchema))
    register(@Body() dto: RegisterUserDto) {
      return this.authService.register(dto);
    }
  
    @UseGuards(AuthGuard)
    @Get('user')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  