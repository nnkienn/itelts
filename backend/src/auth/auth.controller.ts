import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'; // Thêm Response ở đây
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { Public } from '../common/decorators/public.decorator'; // Import Public decorator

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()                          // 👈 public
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { user, backendTokens } = await this.authService.register(dto);
    res.cookie('refreshToken', backendTokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { user, backendTokens };
  }

  @Public()                          // 👈 public
  @Post('login')
  async signIn(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, backendTokens } = await this.authService.signIn(loginDto); // ⬅️ đổi tên biến ở đây

    res.cookie('refreshToken', backendTokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { user, backendTokens }; // ⬅️ trả đúng field
  }


  @Post('refresh-token')
  refresh(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken']; // 👈 lấy từ cookie
    return this.authService.refreshToken(refreshToken);
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken')
    return { message: 'Logout successful' };
  }
}