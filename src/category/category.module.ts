import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { InMemoryCategoryStore } from './store/category.storage';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'CategoryStorage',
      useClass: InMemoryCategoryStore,
    },
  ],
})
export class CategoryModule {}
