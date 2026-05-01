import { IsEnum, IsOptional } from 'class-validator';
import { AnalyzeTask } from 'src/constants/enums';

export class AnalyzeArticleRequestDto {
  @IsEnum(AnalyzeTask)
  @IsOptional()
  task?: AnalyzeTask;
}
