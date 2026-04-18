import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ArticleService } from 'src/article/article.service';
import { User } from './entities/users.entity';
import { CommentService } from 'src/comment/comment.service';
import { UserDbStorage } from './store/users.db.storage';

@Injectable()
export class UsersService {
  constructor(
    private storage: UserDbStorage,
    private articleService: ArticleService,
    private commentService: CommentService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    if (await this.findByLogin(createUserDto.login)) {
      throw new HttpException('Login is already taken', HttpStatus.BAD_REQUEST);
    }

    return await this.storage.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.storage.findAll();
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.storage.findById(id);
  }

  async findByLogin(login: string): Promise<User | undefined> {
    return await this.storage.findByLogin(login);
  }

  async update(id: string, passwordData: UpdatePasswordDto): Promise<User> {
    const user = await this.storage.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== passwordData.oldPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    }

    return this.storage.update(id, { password: passwordData.newPassword });
  }

  async remove(id: string) {
    const articles = await this.articleService.findByAuthor(id);
    const comments = await this.commentService.findByAuthor(id);

    articles.forEach(
      async (article) =>
        await this.articleService.update(article.id, { authorId: null }),
    );

    comments.forEach(async (comment) => {
      await this.commentService.remove(comment.id);
    });

    return this.storage.delete(id);
  }
}
