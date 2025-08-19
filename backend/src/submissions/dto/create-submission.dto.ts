import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubmissionDto {
  type: 'WRITING';              // "WRITING" (sau này có thể "SPEAKING")

  @IsString()
  @IsNotEmpty()
  contentText: string;       // Bài viết của học viên

  @IsOptional()
  @IsInt()
  promptId?: number;         // Bank đề (nếu có)

  @IsOptional()
  @IsInt()
  paymentId?: number;        // Nếu bài này là bài có trả phí
}
