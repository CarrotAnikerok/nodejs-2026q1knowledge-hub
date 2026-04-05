import { CreateArticleDto } from '../dto/create-article.dto';
import { FindQueryArticleDto } from '../dto/find-query-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Article } from '../entities/article.entity';

export interface ArticleStorage {
  findAll(): Article[];
  findAllWithQuery(queryArticleDto: FindQueryArticleDto): Article[];
  findById(id: string): Article | undefined;
  create(articleDto: CreateArticleDto): Article;
  update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): UpdateArticleDto | undefined;
  delete(id: string): void;
  findByAuthor(userId: string): Article[];
  findByCategory(categoryId: string): Article[];
}
