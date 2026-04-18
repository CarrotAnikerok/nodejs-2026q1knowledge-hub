import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/constants/enums';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);

    if (user) {
      throw new HttpException(
        'User login is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersService.create({ login, password, role: UserRole.VIEWER });
  }

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);

    if (user?.password !== password) {
      throw new HttpException('Authentication failed', HttpStatus.FORBIDDEN);
    }

    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
