import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [ArticleModule],
  controllers: [AiController],
  providers: [GeminiService, AiService],
})
export class AiModule {}
