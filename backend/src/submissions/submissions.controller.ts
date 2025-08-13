import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) { }

  @Post()
  @Roles('Student')
  async createSubmission(
    @GetUser('sub') userId: number,
    @Body() dto: CreateSubmissionDto,
  ) {
    return this.submissionsService.create(userId, dto);
  }


  @Roles('Student')
  @Get('me/writing')
  findMyWritings(@GetUser('sub') userId: number) {  // chú ý: lấy 'sub' chứ không phải 'id'
    return this.submissionsService.findMyWritingSubmissions(userId);
  }

  @Roles('Student')
  @Get('me/writing')
  findMySpeaking(@GetUser('sub') userId: number) {  // chú ý: lấy 'sub' chứ không phải 'id'
    return this.submissionsService.findMyWritingSubmissions(userId)
  }

  // submissions.controller.ts
  @Roles('Admin', 'Teacher')
  @Get('students')
  findAllStudentWritings() {
    return this.submissionsService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(+id, updateSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(+id);
  }
}
