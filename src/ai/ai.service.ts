import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import 'dotenv/config';
import { GeminiService } from './gemini.service';
import {
  getSummarizeArticlePrompt,
  getSummarizeInstruction,
  getTranslateArticlePrompt,
  getTranslationInstruction,
} from './prompts/articlePrompts';
import { SummarizeArticleRequestDto } from './dto/summarize-article-request.dto';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/entities/article.entity';
import { MaxPromptLength } from 'src/constants/enums';
import { SummarizeArticleResponseDto } from './dto/summarize-article-response.dto';
import { TranslateArticleResponseDto } from './dto/translate-article-response.dto';
import { TranslateArticleRequestDto } from './dto/translate-article-request.dto';

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
      getSummarizeInstruction(),
    );

    const answerDto: SummarizeArticleResponseDto = {
      articleId: id,
      summary,
      originalLength: article.content.length,
      summaryLength: summary.length,
    };

    return answerDto;
  }

  async translate(
    id: string,
    articleRequest: TranslateArticleRequestDto,
  ): Promise<TranslateArticleResponseDto> {
    const article: Article = await this.articleService.findById(id);
    const rawTranslationJson = await this.ai.sendPrompt(
      getTranslateArticlePrompt(
        article.content,
        articleRequest.targetLanguage,
        articleRequest.sourceLanguage,
      ),
      getTranslationInstruction(),
    );

    let translation;
    try {
      translation = JSON.parse(rawTranslationJson);
    } catch {
      throw new ServiceUnavailableException(rawTranslationJson);
    }

    const answerDto: TranslateArticleResponseDto = {
      articleId: id,
      translatedText: translation.translation,
      detectedLanguage: translation.detected_language,
    };

    return answerDto;
  }
}
