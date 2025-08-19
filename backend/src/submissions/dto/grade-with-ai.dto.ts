import { IsOptional, IsString } from 'class-validator';

export class GradeWithAIDto {
  @IsOptional()
  @IsString()
  promptText?: string;  // nếu muốn truyền prompt trực tiếp
}
