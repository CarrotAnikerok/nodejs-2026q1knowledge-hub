import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ArticleModule } from 'src/article/article.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryDbStorage } from './store/category.db.storage';

@Module({
  imports: [ArticleModule, PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryDbStorage],
})
export class CategoryModule {}
