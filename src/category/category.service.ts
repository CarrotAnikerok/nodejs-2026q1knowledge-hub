import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryStorage } from './interfaces/category.storage.interface';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryStorage') private readonly storage: CategoryStorage,
    private readonly articleService: ArticleService,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.storage.create(createCategoryDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.storage.update(id, updateCategoryDto);
  }

  remove(id: string) {
    const articles = this.articleService.findByCategory(id);

    articles.forEach((article) => {
      this.articleService.update(article.id, { categoryId: null });
    });

    return this.storage.delete(id);
  }
}
