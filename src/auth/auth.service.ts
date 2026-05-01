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
import { PrismaService } from 'src/prisma/prisma.service';

type Payload = {
  userId: string;
  sub: string;
  login: string;
  role: UserRole;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
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
      parseInt(process.env.CRYPT_SALT, 10) || 10,
    );

    return await this.usersService.create({
      login,
      password: hashedPassword,
      role: UserRole.VIEWER,
    });
  }

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);

    if (!user || !bcrypt.compare(password, user.password)) {
      throw new HttpException('Authentication failed', HttpStatus.FORBIDDEN);
    }

    const payload: Payload = {
      sub: user.id,
      userId: user.id,
      login: user.login,
      role: user.role,
    };
    return this.getTokens(payload);
  }

  async refresh(dto: refreshTokenDto) {
    if (!dto.refreshToken) {
      throw new UnauthorizedException();
    }

    let decodedPayload: Payload;

    try {
      decodedPayload = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
    } catch {
      throw new ForbiddenException();
    }

    const { sub, userId, login, role } = decodedPayload;

    return this.getTokens({ sub, userId, login, role });
  }

  async logout(dto: refreshTokenDto) {
    if (!dto.refreshToken) {
      throw new UnauthorizedException();
    }

    let decodedPayload;

    try {
      decodedPayload = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
    } catch {
      throw new ForbiddenException();
    }

    const expiresAt = new Date(decodedPayload.exp * 1000);
    await this.prisma.tokenBlacklist.create({
      data: {
        token: dto.refreshToken,
        expiresAt,
      },
    });
  }

  async getTokens(payload: Payload) {
    const baseOptions: JwtSignOptions = {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expireTime as any,
    };

    const refreshOptions: JwtSignOptions = {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshExpireTime as any,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, baseOptions),
      this.jwtService.signAsync(payload, refreshOptions),
    ]);

    return { accessToken, refreshToken };
  }
}
