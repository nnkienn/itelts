import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(userId: number, dto: CreateSubmissionDto) {
    return this.prismaService.submission.create({
      data: {
        user: { connect: { id: userId } },
        type: dto.type,
        contentText: dto.contentText,
        audioUrl: dto.audioUrl,
        payment: dto.paymentId
          ? { connect: { id: dto.paymentId } }
          : undefined,
      },
    });
  }
  async findMyWritingSubmissions(userId: number) {
    return this.prismaService.submission.findMany({
      where: {
        userId,
        type: 'WRITING',
      },
    })
  }
  async findMySpeakingSubmissions(userId: number) {
    return this.prismaService.submission.findMany({
      where: {
        userId,
        type: 'SPEAKING',
      },
    })
  }

  findAll() {
   return this.prismaService.submission.findMany();
  }

  update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    return this.prismaService.submission.update({
      where: { id },
      data: updateSubmissionDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} submission`;
  }
}
