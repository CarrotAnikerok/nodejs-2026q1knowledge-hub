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
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Get()
  async findAll(@Query() queryArticleDto: FindQueryArticleDto) {
    return await this.articleService.findAllWithQuery(queryArticleDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const article = await this.#checkExisting(id);
    return article;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    await this.#checkExisting(id);
    return await this.articleService.update(id, updateArticleDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.#checkExisting(id);
    return await this.articleService.remove(id);
  }

  async #checkExisting(id: string) {
    const article = await this.articleService.findById(id);

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    return article;
  }
}
