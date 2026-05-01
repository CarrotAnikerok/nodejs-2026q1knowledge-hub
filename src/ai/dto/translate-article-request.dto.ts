import { IsOptional, IsString } from 'class-validator';

export class TranslateArticleRequestDto {
  @IsString()
  targetLanguage: string;
  @IsOptional()
  @IsString()
  sourceLanguage?: string;
}
