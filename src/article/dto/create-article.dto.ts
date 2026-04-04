import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ArticleStatus } from 'src/constants/enums';

export class CreateArticleDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @IsUUID()
  // or null
  authorId: string | null;

  @IsUUID()
  categoryId: string | null;

  tags: string[];
}
