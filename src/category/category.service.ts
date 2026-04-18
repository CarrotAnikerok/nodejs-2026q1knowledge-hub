import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ArticleService } from 'src/article/article.service';
import { CategoryDbStorage } from './store/category.db.storage';

@Injectable()
export class CategoryService {
  constructor(
    private readonly storage: CategoryDbStorage,
    private readonly articleService: ArticleService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.storage.create(createCategoryDto);
  }

  async findAll() {
    return await this.storage.findAll();
  }

  async findOne(id: string) {
    return await this.storage.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.storage.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    const articles = await this.articleService.findByCategory(id);

    articles.forEach(async (article) => {
      await this.articleService.update(article.id, { categoryId: null });
    });

    return await this.storage.delete(id);
  }
}
