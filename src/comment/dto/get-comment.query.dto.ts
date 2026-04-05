import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCommentQueryDto {
  @IsUUID()
  @IsNotEmpty()
  articleId: string;
}
