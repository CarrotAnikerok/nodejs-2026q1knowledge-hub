import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { CommentService } from 'src/comment/comment.service';
import { FindQueryArticleDto } from './dto/find-query-article.dto';
import { ArticleDbStorage } from './store/article.db.storage';

@Injectable()
export class ArticleService {
  constructor(
    private readonly storage: ArticleDbStorage,
    private commentService: CommentService,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.storage.create(createArticleDto);
  }

  async findAll(): Promise<Article[]> {
    return await this.storage.findAll();
  }

  async findAllWithQuery(
    queryArticleDto: FindQueryArticleDto,
  ): Promise<Article[]> {
    return await this.storage.findAllWithQuery(queryArticleDto);
  }

  async findById(id: string): Promise<Article | undefined> {
    return await this.storage.findById(id);
  }

  async findByAuthor(userId: string): Promise<Article[]> {
    return await this.storage.findByAuthor(userId);
  }

  async findByCategory(categoryId: string): Promise<Article[]> {
    return await this.storage.findByCategory(categoryId);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.storage.update(id, updateArticleDto);
  }

  async remove(id: string) {
    const comments = await this.commentService.findByArticle(id);

    comments.forEach(async (comments) => {
      await this.commentService.remove(comments.id);
    });

    return await this.storage.delete(id);
  }
}
