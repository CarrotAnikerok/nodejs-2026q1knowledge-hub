import { BaseDbStorage } from 'src/common/base.db.storage';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { Article } from '../entities/article.entity';
import { FindQueryArticleDto } from '../dto/find-query-article.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleDbStorage extends BaseDbStorage<Article> {
  constructor(service: PrismaService) {
    super(service, Prisma.ModelName.Article, Article);
  }

  async findAllWithQuery(
    queryArticleDto: FindQueryArticleDto,
  ): Promise<Article[]> {
    const { categoryId, status, tag } = queryArticleDto;
    return await this.model.findMany({
      where: {
        categoryId: categoryId ?? undefined,
        status: status ?? undefined,
        tags: tag ? { some: { name: tag } } : undefined,
      },
    });
  }

  async findByAuthor(authorId: string): Promise<Article[]> {
    const results = await this.model.findMany({ where: { authorId } });
    return results.map((result: any) => this.toEntity(result));
  }

  async findByCategory(categoryId: string): Promise<Article[]> {
    const results = await this.model.findMany({ where: { categoryId } });
    return results.map((result: any) => this.toEntity(result));
  }
}
