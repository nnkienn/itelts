import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService // 👈 thêm dòng này

  ) { }
  async register(registerDto: RegisterDto) {
    const { email, password, name, roleId } = registerDto;
    const existingEmail = await this.prismaService.user.findUnique({ where: { email } });
    if (existingEmail) {
      throw new ConflictException("Email is already in user")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const registerUser = await this.prismaService.user.create({ data: { email, password: hashPassword, name, roleId } })
    const { password: _, ...result } = registerUser;
    return result;
  }
  async signIn(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
  const { password, ...userWithoutPassword } = user;

    return {
      userWithoutPassword,
      backendTokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email)
    if (!user) {
      throw new UnauthorizedException('Email not found');
    }

    const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);

    if (isPasswordMatch) {
      const { password, ...result } = user
      return user
    }
    throw new UnauthorizedException('Password invalid');



  }

}
