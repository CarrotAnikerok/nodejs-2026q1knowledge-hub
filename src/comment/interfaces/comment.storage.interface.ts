import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentQueryDto } from '../dto/get-comment.query.dto';
import { Comment } from '../entities/comment.entity';

export interface CommentStorage {
  findAll(commentQueryDto: GetCommentQueryDto): Comment[];
  findById(id: string): Comment | undefined;
  create(commentDto: CreateCommentDto): Comment;
  delete(id: string): void;
  findByAuthor(userId: string): Comment[];
}
