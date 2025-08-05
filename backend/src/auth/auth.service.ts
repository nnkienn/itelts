import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService : UsersService
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
async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
  const user = await this.userService.findByEmail(loginDto.email);

  if (!user) {
    throw new UnauthorizedException('Email not found');
  }

  const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedException('Invalid password');
  }

  const payload = { sub: user.id, email: user.email };
  return {
    access_token: await this.jwtService.signAsync(payload),
  };
}

}
