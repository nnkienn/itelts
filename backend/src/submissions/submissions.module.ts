import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 25000 })],
  controllers: [SubmissionsController],
  providers: [SubmissionsService,PrismaService ],
})
export class SubmissionsModule {}
