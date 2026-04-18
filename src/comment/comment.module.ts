import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ArticleModule } from 'src/article/article.module';
import { CommentDbStorage } from './store/comment.db.storage';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => ArticleModule), PrismaModule],
  controllers: [CommentController],
  providers: [CommentService, CommentDbStorage],
  exports: [CommentService],
})
export class CommentModule {}
