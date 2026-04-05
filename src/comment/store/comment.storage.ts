import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CommentStorage } from '../interfaces/comment.storage.interface';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class InMemoryCommentStore implements CommentStorage {
  private comments: Comment[] = [];

  findByArticle(articleId: string): Comment[] {
    return this.comments.filter((comment) => comment.articleId === articleId);
  }

  findById(id: string): Comment | undefined {
    return this.comments.find((comment) => comment.id === id);
  }

  findByAuthor(userId: string): Comment[] {
    return this.comments.filter((comment) => comment.authorId === userId);
  }

  create(userDto: CreateCommentDto): Comment {
    const newUser: Comment = {
      ...userDto,
      id: randomUUID(),
      createdAt: Date.now(),
    };

    this.comments.push(newUser);
    return newUser;
  }

  delete(id: string): void {
    const userToDelete = this.findById(id);
    const userIndex = this.comments.indexOf(userToDelete);

    if (userIndex !== -1) {
      this.comments.splice(userIndex, 1);
    }
  }
}
