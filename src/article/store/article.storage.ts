import { randomUUID } from 'node:crypto';
import { CreateArticleDto } from '../dto/create-article.dto';
import { Article } from '../entities/article.entity';
import { ArticleStorage } from '../interfaces/article.storage.interface';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryArticleStore implements ArticleStorage {
  private articles: Article[] = [];

  findAll(): Article[] {
    return this.articles;
  }

  findById(id: string): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  findByAuthor(userId: string): Article[] {
    return this.articles.filter((article) => article.authorId === userId);
  }

  create(articleDto: CreateArticleDto): Article {
    const newUser: Article = {
      ...articleDto,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.articles.push(newUser);
    return newUser;
  }

  update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): UpdateArticleDto | undefined {
    const articleToUpdate = this.findById(id);
    Object.assign(articleToUpdate, updateArticleDto);

    return articleToUpdate;
  }

  delete(id: string): void {
    const articleToDelete = this.findById(id);
    const userIndex = this.articles.indexOf(articleToDelete);

    if (userIndex !== -1) {
      this.articles.splice(userIndex, 1);
    } else {
      throw Error('Article doesn`t exist');
    }
  }
}
