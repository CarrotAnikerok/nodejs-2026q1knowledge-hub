import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ArticleStatus } from 'src/constants/enums';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @IsUUID()
  @IsOptional()
  authorId: string | null;

  @IsUUID()
  @IsOptional()
  categoryId: string | null;

  tags: string[];
}
