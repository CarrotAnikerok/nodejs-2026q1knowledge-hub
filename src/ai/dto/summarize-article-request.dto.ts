import { IsEnum, IsOptional } from 'class-validator';
import { MaxPromptLength } from 'src/constants/enums';

export class SummarizeArticleRequestDto {
  @IsEnum(MaxPromptLength)
  @IsOptional()
  maxLength?: MaxPromptLength;
}
