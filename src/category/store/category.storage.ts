import { randomUUID } from 'node:crypto';
import { CategoryStorage } from '../interfaces/category.storage.interface';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class InMemoryCategoryStore implements CategoryStorage {
  private categories: Category[] = [];

  findAll(): Category[] {
    return this.categories;
  }

  findById(id: string): Category | undefined {
    return this.categories.find((article) => article.id === id);
  }

  create(categoryDto: CreateCategoryDto): Category {
    const newUser: Category = {
      ...categoryDto,
      id: randomUUID(),
    };

    this.categories.push(newUser);
    return newUser;
  }

  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): UpdateCategoryDto | undefined {
    const articleToUpdate = this.findById(id);
    Object.assign(articleToUpdate, updateCategoryDto);

    return articleToUpdate;
  }

  delete(id: string): void {
    const categoryToDelete = this.findById(id);
    const userIndex = this.categories.indexOf(categoryToDelete);

    if (userIndex !== -1) {
      this.categories.splice(userIndex, 1);
    }
  }
}
