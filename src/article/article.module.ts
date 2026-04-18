import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CommentModule } from 'src/comment/comment.module';
import { ArticleDbStorage } from './store/article.db.storage';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => CommentModule), PrismaModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleDbStorage],
  exports: [ArticleService],
})
export class ArticleModule {}
