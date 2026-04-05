import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

export interface CategoryStorage {
  findAll(): Category[];
  findById(id: string): Category | undefined;
  create(articleDto: CreateCategoryDto): Category;
  update(
    id: string,
    updateArticleDto: UpdateCategoryDto,
  ): UpdateCategoryDto | undefined;
  delete(id: string): void;
}
