import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { InMemoryArticleStore } from './store/article.storage';

@Module({
  controllers: [ArticleController],
  providers: [
    ArticleService,
    {
      provide: 'ArticleStorage',
      useClass: InMemoryArticleStore,
    },
  ],
  exports: [
    ArticleService,
    {
      provide: 'ArticleStorage',
      useClass: InMemoryArticleStore,
    },
  ],
})
export class ArticleModule {}
