import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentStorage } from './interfaces/comment.storage.interface';
import { GetCommentQueryDto } from './dto/get-comment.query.dto';

@Injectable()
export class CommentService {
  constructor(
    @Inject('CommentStorage') private readonly storage: CommentStorage,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.storage.create(createCommentDto);
  }

  findAll(commentQueryDto: GetCommentQueryDto) {
    return this.storage.findAll(commentQueryDto);
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
