import { IsUUID } from 'class-validator';

export class AnalyzeArticleResponseDto {
  @IsUUID()
  articleId: string;
  analysis: string;
  suggestions: string[];
  severity: 'info' | 'warning' | 'error';
}
