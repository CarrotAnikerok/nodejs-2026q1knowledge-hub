import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsUUID()
  articleId: string;

  @IsUUID()
  @IsOptional()
  authorId: string | null;
}
