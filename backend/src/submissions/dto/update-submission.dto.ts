import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmissionDto } from './create-submission.dto';
import { IsEnum, IsOptional, IsString, IsNumber, isNumber } from 'class-validator';

export class UpdateSubmissionDto extends PartialType(CreateSubmissionDto) {

    @IsOptional()
    @IsNumber()
    paymentId?: number;

    @IsOptional()
    @IsString()
    audioUrl?: string;

    @IsOptional()
    @IsNumber()
    contentText?: string;

}
