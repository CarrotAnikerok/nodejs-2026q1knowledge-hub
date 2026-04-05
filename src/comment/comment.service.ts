import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentStorage } from './interfaces/comment.storage.interface';

@Injectable()
export class CommentService {
  constructor(
    @Inject('CommentStorage') private readonly storage: CommentStorage,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.storage.create(createCommentDto);
  }

  findByArticle(articleId: string) {
    return this.storage.findByArticle(articleId);
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  findByAuthor(id: string) {
    return this.storage.findByAuthor(id);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
