import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleStorage } from './interfaces/article.storage.interface';
import { Article } from './entities/article.entity';
import { CommentService } from 'src/comment/comment.service';
import { FindQueryArticleDto } from './dto/find-query-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ArticleStorage') private readonly storage: ArticleStorage,
    private commentService: CommentService,
  ) {}

  create(createArticleDto: CreateArticleDto): Article {
    return this.storage.create(createArticleDto);
  }

  findAll(): Article[] {
    return this.storage.findAll();
  }

  findAllWithQuery(queryArticleDto: FindQueryArticleDto): Article[] {
    return this.storage.findAllWithQuery(queryArticleDto);
  }

  findById(id: string): Article | undefined {
    return this.storage.findById(id);
  }

  findByAuthor(userId: string): Article[] {
    return this.storage.findByAuthor(userId);
  }

  findByCategory(categoryId: string): Article[] {
    return this.storage.findByCategory(categoryId);
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.storage.update(id, updateArticleDto);
  }

  remove(id: string) {
    const comments = this.commentService.findByArticle(id);

    comments.forEach((comments) => {
      this.commentService.remove(comments.id);
    });

    return this.storage.delete(id);
  }
}
