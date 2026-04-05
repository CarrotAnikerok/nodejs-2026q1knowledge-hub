import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { InMemoryCommentStore } from './store/comment.storage';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [forwardRef(() => ArticleModule)],
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: 'CommentStorage',
      useClass: InMemoryCommentStore,
    },
  ],
  exports: [CommentService],
})
export class CommentModule {}
