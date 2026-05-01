import { IsString, IsUUID } from 'class-validator';

export class TranslateArticleResponseDto {
  @IsUUID()
  articleId: string;
  @IsString()
  translatedText: string;
  @IsString()
  detectedLanguage: string;
}
