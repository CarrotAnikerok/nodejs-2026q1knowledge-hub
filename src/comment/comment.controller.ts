import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentQueryDto } from './dto/get-comment.query.dto';
import { ArticleService } from 'src/article/article.service';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly articleService: ArticleService,
  ) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    const article = this.articleService.findById(createCommentDto.articleId);

    if (!article) {
      throw new HttpException(
        'Article is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAllByArticle(@Query() commentQueryDto: GetCommentQueryDto) {
    return this.commentService.findByArticle(commentQueryDto.articleId);
  }

  @Get(':id')
  findOne(@Query() @Param('id', ParseUUIDPipe) id: string) {
    return this.#checkExisting(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.#checkExisting(id);
    return this.commentService.remove(id);
  }

  #checkExisting(id: string) {
    const comment = this.commentService.findOne(id);

    if (!comment) {
      throw new NotFoundException('Comment is not found');
    }

    return comment;
  }
}
