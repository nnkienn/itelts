import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from './common/guard/jwt.guard';
import { PrismaService } from './prisma.service';
import { RolesModule } from './roles/roles.module';
import { RolesGuard } from './common/guard/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({}),
    UsersModule,
    AuthModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtGuard },   // chạy TRƯỚC
    { provide: APP_GUARD, useClass: RolesGuard }, // chạy SAU
  ],
})
export class AppModule {}
