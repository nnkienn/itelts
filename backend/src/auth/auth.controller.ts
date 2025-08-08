import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'; // Thêm Response ở đây
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import path from 'path';
import { maxHeaderSize } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async signIn(@Body() loginDto: LoginDto ,@Res({passthrough : true}) res: Response) {
    const {userWithoutPassword, backendTokens} =await this.authService.signIn(loginDto);
    res.cookie('refreshToken',backendTokens.refreshToken, {
      httpOnly : true,
      secure : false,
      sameSite : 'lax',
      path  :'/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    return {
      userWithoutPassword,
      backendTokens: {
        accessToken: backendTokens.accessToken,
        refreshToken: backendTokens.refreshToken,
      },
    };
  }


  @Post('refresh-token')
  refresh(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken']; // 👈 lấy từ cookie
    return this.authService.refreshToken(refreshToken);
  }
  @Post('logout')
  logout(@Res({passthrough : true}) res: Response) {
    res.clearCookie('refreshToken')
    return { message: 'Logout successful' };
  }
}
