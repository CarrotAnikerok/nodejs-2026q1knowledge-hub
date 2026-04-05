import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersStore } from './store/users.storage';
import { ArticleModule } from 'src/article/article.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [ArticleModule, CommentModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserStorage',
      useClass: InMemoryUsersStore,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
