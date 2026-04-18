import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ArticleModule } from 'src/article/article.module';
import { CommentModule } from 'src/comment/comment.module';
import { UserDbStorage } from './store/users.db.storage';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ArticleModule, CommentModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UserDbStorage],
  exports: [UsersService],
})
export class UsersModule {}
