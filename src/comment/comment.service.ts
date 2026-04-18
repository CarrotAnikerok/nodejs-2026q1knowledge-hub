import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDbStorage } from './store/comment.db.storage';

@Injectable()
export class CommentService {
  constructor(private readonly storage: CommentDbStorage) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.storage.create(createCommentDto);
  }

  async findByArticle(articleId: string) {
    return await this.storage.findByArticle(articleId);
  }

  async findOne(id: string) {
    return await this.storage.findById(id);
  }

  async findByAuthor(id: string) {
    return await this.storage.findByAuthor(id);
  }

  async remove(id: string) {
    return await this.storage.delete(id);
  }
}
