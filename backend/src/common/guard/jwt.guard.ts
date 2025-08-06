import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class JwtGuard implements CanActivate{
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
    ){}
   async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      request['user'] = payload;
      console.log('Payload:', payload);
    } catch (err) {
      throw new UnauthorizedException('Token invalid or expired');
    }
console.log('TOKEN:', token);
console.log('SECRET:', this.configService.get<string>('JWT_ACCESS_SECRET'));

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' && token ? token : undefined;
  }
}