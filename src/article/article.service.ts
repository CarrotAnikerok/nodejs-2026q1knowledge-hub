import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleStorage } from './interfaces/article.storage.interface';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ArticleStorage') private readonly storage: ArticleStorage,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.storage.create(createArticleDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.storage.update(id, updateArticleDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
