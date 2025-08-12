import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService, UserWithRole } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService
  ) {}

  // REGISTER
  async register(registerDto: RegisterDto) {
    const { email, password, name, roleId } = registerDto;

    const existingEmail = await this.prismaService.user.findUnique({ where: { email } });
    if (existingEmail) throw new ConflictException('Email is already in use');

    const hashPassword = await bcrypt.hash(password, 10);

    // include role để có role.name
    const user = await this.prismaService.user.create({
      data: { email, password: hashPassword, name, roleId },
      include: { role: true },
    });

    const tokens = await this.issueTokens(user as UserWithRole);
    const { password: _pw, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      backendTokens: tokens, // { accessToken, refreshToken }
    };
  }

  // LOGIN
  async signIn(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto); // UserWithRole
    const tokens = await this.issueTokens(user);
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      backendTokens: tokens, // { accessToken, refreshToken }
    };
  }

  // TẠO TOKEN
  private async issueTokens(user: UserWithRole) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role?.name || null,
      name: user.name ?? null,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      },
    );

    return { accessToken, refreshToken }; // <-- ĐÚNG CHÍNH TẢ & THỐNG NHẤT
  }

  // KIỂM TRA USER
  async validateUser(loginDto: LoginDto): Promise<UserWithRole> {
    const user = await this.userService.findByEmail(loginDto.email); // phải include role trong UsersService
    if (!user) throw new UnauthorizedException('Email not found');

    const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Password invalid');

    return user as UserWithRole;
  }

  // REFRESH
  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: number; email: string }>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
        include: { role: true },
      });
      if (!user) throw new UnauthorizedException('User not found');

      // Chỉ phát lại access token (giống flow bạn đang dùng)
      const { accessToken } = await this.issueTokens(user as UserWithRole);
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
