import { IsEnum, IsOptional, IsString, IsNumber, isNumber } from 'class-validator';

export class CreateSubmissionDto {
    @IsEnum(['Speaking', 'Writing'])
    type: string;

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
