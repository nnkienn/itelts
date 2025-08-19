import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GradeWithAIDto } from './dto/grade-with-ai.dto';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) { }

  @Roles('Student')
  @Post()
  create(@Body() dto: CreateSubmissionDto, @GetUser('sub') userId: number) {
    return this.submissionsService.create(userId, dto)
  }

  @Roles('Student')
  @Post(':id/grade')
  async grade(
    @Param('id') id: string,
    @Body() body: GradeWithAIDto,
    @GetUser('sub') userId: number,
  ) {
    const res = await this.submissionsService.gradeWithAi(
      Number(id),
      userId,
      body?.promptText || '',
    );
    return { ok: true, ...res };
  }
}
