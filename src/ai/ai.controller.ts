import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { SummarizeArticleRequestDto } from './dto/summarize-article-request.dto';

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
}
