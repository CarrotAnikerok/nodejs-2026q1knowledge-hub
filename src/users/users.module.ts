import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersStore } from './store/users.storage';
import { ArticleService } from 'src/article/article.service';
import { InMemoryArticleStore } from 'src/article/store/article.storage';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ArticleService,
    {
      provide: 'UserStorage',
      useClass: InMemoryUsersStore,
    },
    {
      provide: 'ArticleStorage',
      useClass: InMemoryArticleStore,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
