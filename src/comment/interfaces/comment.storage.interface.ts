import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';

export interface CommentStorage {
  findByArticle(articleId: string): Comment[];
  findById(id: string): Comment | undefined;
  create(commentDto: CreateCommentDto): Comment;
  delete(id: string): void;
  findByAuthor(userId: string): Comment[];
}
