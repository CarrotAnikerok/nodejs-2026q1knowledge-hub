import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { SummarizeArticleRequestDto } from './dto/summarize-article-request.dto';
import { TranslateArticleRequestDto } from './dto/translate-article-request.dto';
import { AnalyzeArticleRequestDto } from './dto/analize-article-request.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('articles/:articleId/summarize')
  async summarize(
    @Param('articleId', ParseUUIDPipe) id: string,
    @Body() articleRequest: SummarizeArticleRequestDto,
  ) {
    return this.aiService.summarize(id, articleRequest);
  }

  @Post('articles/:articleId/translate')
  async translate(
    @Param('articleId', ParseUUIDPipe) id: string,
    @Body() articleRequest: TranslateArticleRequestDto,
  ) {
    return this.aiService.translate(id, articleRequest);
  }

  @Post('articles/:articleId/analyze')
  async analyze(
    @Param('articleId', ParseUUIDPipe) id: string,
    @Body() articleRequest: AnalyzeArticleRequestDto,
  ) {
    return this.aiService.analyze(id, articleRequest);
  }
}
