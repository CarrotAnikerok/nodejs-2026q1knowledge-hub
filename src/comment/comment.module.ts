import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { InMemoryCommentStore } from './store/comment.storage';
import { ArticleService } from 'src/article/article.service';
import { InMemoryArticleStore } from 'src/article/store/article.storage';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    ArticleService,
    {
      provide: 'CommentStorage',
      useClass: InMemoryCommentStore,
    },
    {
      provide: 'ArticleStorage',
      useClass: InMemoryArticleStore,
    },
  ],
})
export class CommentModule {}
