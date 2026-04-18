import { BaseDbStorage } from 'src/common/base.db.storage';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { Comment } from '../entities/comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentDbStorage extends BaseDbStorage<Comment> {
  constructor(service: PrismaService) {
    super(service, Prisma.ModelName.Comment, Comment);
  }

  async findByArticle(articleId: string): Promise<Comment[]> {
    const results = await this.model.findMany({ where: { articleId } });
    return results.map((result: any) => this.toEntity(result));
  }

  async findByAuthor(authorId: string): Promise<Comment[]> {
    const results = await this.model.findMany({ where: { authorId } });
    return results.map((result: any) => this.toEntity(result));
  }
}
