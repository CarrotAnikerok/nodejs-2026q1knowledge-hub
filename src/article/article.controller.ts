import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindQueryArticleDto } from './dto/find-query-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll(@Query() queryArticleDto: FindQueryArticleDto) {
    return this.articleService.findAllWithQuery(queryArticleDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const article = this.#checkExisting(id);
    return article;
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    this.#checkExisting(id);
    return this.articleService.update(id, updateArticleDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.#checkExisting(id);
    return this.articleService.remove(id);
  }

  #checkExisting(id: string) {
    const article = this.articleService.findById(id);

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    return article;
  }
}
