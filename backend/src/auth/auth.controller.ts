import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  create(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
   @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto)
  }
}
