import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserRole } from 'src/constants/enums';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { refreshTokenDto } from './dto/refresh-token.dto';

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

    const hashedPassword = await bcrypt.hash(
      password,
      process.env.CRYPT_SALT || 10,
    );

    await this.usersService.create({
      login,
      password: hashedPassword,
      role: UserRole.VIEWER,
    });
  }

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);

    if (!user || bcrypt.compare(password, user.password)) {
      throw new HttpException('Authentication failed', HttpStatus.FORBIDDEN);
    }

    const payload = { sub: user.id, login: user.login, role: user.role };
    return this.getTokens(payload.sub, payload.login, payload.role);
  }

  async refresh(dto: refreshTokenDto) {
    if (!dto.refreshToken) {
      throw new UnauthorizedException();
    }

    let decodedPayload: { userId: string; login: string; role: string };

    try {
      decodedPayload = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
    } catch {
      throw new ForbiddenException();
    }

    return this.getTokens(
      decodedPayload.userId,
      decodedPayload.login,
      decodedPayload.role,
    );
  }

  async getTokens(userId: string, login: string, role: string) {
    const payload = { sub: userId, login, role };

    const baseOptions: JwtSignOptions = {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expireTime as any,
    };

    const refreshOptions: JwtSignOptions = {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshExpireTime as any,
    };

    const [baseToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, baseOptions),
      this.jwtService.signAsync(payload, refreshOptions),
    ]);

    return { baseToken, refreshToken };
  }
}
