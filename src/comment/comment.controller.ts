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
import { UserRole } from 'src/constants/enums';
import { Roles } from 'src/decorators/role.decorator';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly articleService: ArticleService,
  ) {}

  @Roles(UserRole.EDITOR)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const article = await this.articleService.findById(
      createCommentDto.articleId,
    );

    if (!article) {
      throw new HttpException(
        'Article is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAllByArticle(@Query() commentQueryDto: GetCommentQueryDto) {
    return await this.commentService.findByArticle(commentQueryDto.articleId);
  }

  @Get(':id')
  async findOne(@Query() @Param('id', ParseUUIDPipe) id: string) {
    return await this.#checkExisting(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.#checkExisting(id);
    return await this.commentService.remove(id);
  }

  async #checkExisting(id: string) {
    const comment = await this.commentService.findOne(id);

    if (!comment) {
      throw new NotFoundException('Comment is not found');
    }

    return comment;
  }
}
