import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { GeminiService } from './gemini.service';
import { getSummarizeArticlePrompt } from './prompts/articlePrompts';
import { SummarizeArticleRequestDto } from './dto/summarize-article-request.dto';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/entities/article.entity';
import { MaxPromptLength } from 'src/constants/enums';
import { SummarizeArticleResponseDto } from './dto/summarize-article-response.dto';

@Injectable()
export class AiService {
  constructor(
    private readonly ai: GeminiService,
    private readonly articleService: ArticleService,
  ) {}

  async summarize(
    id: string,
    articleRequest: SummarizeArticleRequestDto,
  ): Promise<SummarizeArticleResponseDto> {
    const article: Article = await this.articleService.findById(id);

    const promptLength = articleRequest.maxLength || MaxPromptLength.MEDIUM;
    const summary = await this.ai.sendPrompt(
      getSummarizeArticlePrompt(article.content, promptLength),
    );

    const answerDto: SummarizeArticleResponseDto = {
      articleId: id,
      summary,
      originalLength: article.content.length,
      summaryLength: summary.length,
    };

    return answerDto;
  }
}
