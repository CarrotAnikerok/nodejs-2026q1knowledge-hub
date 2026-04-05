import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleStorage } from './interfaces/article.storage.interface';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ArticleStorage') private readonly storage: ArticleStorage,
  ) {}

  create(createArticleDto: CreateArticleDto): Article {
    return this.storage.create(createArticleDto);
  }

  findAll(): Article[] {
    return this.storage.findAll();
  }

  findById(id: string): Article | undefined {
    return this.storage.findById(id);
  }

  findByAuthor(userId: string): Article[] {
    return this.storage.findByAuthor(userId);
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.storage.update(id, updateArticleDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
