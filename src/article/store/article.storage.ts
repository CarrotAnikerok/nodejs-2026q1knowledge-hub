import { randomUUID } from 'node:crypto';
import { CreateArticleDto } from '../dto/create-article.dto';
import { Article } from '../entities/article.entity';
import { ArticleStorage } from '../interfaces/article.storage.interface';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Injectable } from '@nestjs/common';
import { FindQueryArticleDto } from '../dto/find-query-article.dto';

@Injectable()
export class InMemoryArticleStore implements ArticleStorage {
  private articles: Article[] = [];

  findAll(): Article[] {
    return this.articles;
  }

  findAllWithQuery(queryArticleDto: FindQueryArticleDto): Article[] {
    const filteredArticles = this.articles.filter((article) => {
      let isFit = true;

      if (queryArticleDto.categoryId) {
        isFit = isFit && article.categoryId === queryArticleDto.categoryId;
      }

      if (queryArticleDto.status) {
        isFit = isFit && article.status === queryArticleDto.status;
      }

      if (queryArticleDto.tag) {
        isFit = isFit && article.tags.includes(queryArticleDto.tag);
      }

      return isFit;
    });

    return filteredArticles;
  }

  findById(id: string): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  findByAuthor(userId: string): Article[] {
    return this.articles.filter((article) => article.authorId === userId);
  }

  findByCategory(categoryId: string): Article[] {
    return this.articles.filter((article) => article.categoryId === categoryId);
  }

  create(articleDto: CreateArticleDto): Article {
    const newArticle: Article = {
      ...articleDto,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (!newArticle.tags) {
      newArticle.tags = [];
    }

    this.articles.push(newArticle);
    return newArticle;
  }

  update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): UpdateArticleDto | undefined {
    const articleToUpdate = this.findById(id);
    Object.assign(articleToUpdate, updateArticleDto);

    if (updateArticleDto.tags) {
      articleToUpdate.tags = [...updateArticleDto.tags];
    }

    articleToUpdate.updatedAt = Date.now();

    return articleToUpdate;
  }

  delete(id: string): void {
    const articleToDelete = this.findById(id);
    const userIndex = this.articles.indexOf(articleToDelete);

    if (userIndex !== -1) {
      this.articles.splice(userIndex, 1);
    }
  }
}
