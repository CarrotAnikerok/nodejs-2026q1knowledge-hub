import { IsOptional, IsString } from 'class-validator';

export class FindQueryArticleDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  categoryId: string;

  @IsString()
  @IsOptional()
  tag: string;
}
