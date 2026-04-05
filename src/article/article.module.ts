import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { InMemoryArticleStore } from './store/article.storage';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [forwardRef(() => CommentModule)],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    {
      provide: 'ArticleStorage',
      useClass: InMemoryArticleStore,
    },
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
