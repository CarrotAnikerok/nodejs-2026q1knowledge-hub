import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserStorage } from './interfaces/users.storage.interface';
import { ArticleService } from 'src/article/article.service';
import { User } from './entities/user.entity';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserStorage') private storage: UserStorage,
    private articleService: ArticleService,
    private commentService: CommentService,
  ) {}

  create(createUserDto: CreateUserDto): User | undefined {
    return this.storage.create(createUserDto);
  }

  findAll(): User[] {
    return this.storage.findAll();
  }

  findById(id: string): User | undefined {
    return this.storage.findById(id);
  }

  findByLogin(login: string): User | undefined {
    return this.storage.findByLogin(login);
  }

  update(id: string, passwordData: UpdatePasswordDto): User | undefined {
    const user = this.storage.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== passwordData.oldPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    }

    return this.storage.update(id, { password: passwordData.newPassword });
  }

  remove(id: string) {
    const articles = this.articleService.findByAuthor(id);
    const comments = this.commentService.findByAuthor(id);

    articles.forEach((article) =>
      this.articleService.update(article.id, { authorId: null }),
    );

    comments.forEach((comment) => {
      this.commentService.remove(comment.id);
    });

    return this.storage.delete(id);
  }
}
