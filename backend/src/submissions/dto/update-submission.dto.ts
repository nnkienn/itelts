import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmissionDto } from './create-submission.dto';
import { SubmissionStatus } from '@prisma/client';
import { IsEnum, isEnum, IsOptional } from 'class-validator';

export class UpdateSubmissionDto extends PartialType(CreateSubmissionDto) {
    @IsOptional()
    @IsEnum(SubmissionStatus)
    status? : SubmissionStatus

    @IsOptional()
    aiScore?:number

    @IsOptional()
    teacherScore?:number

    @IsOptional()
    gradeAt?: Date
}
