import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sing-auth.dto';
import { refreshTokenDto } from './dto/refresh-token.dto';
import { Public } from 'src/decorators/public.decorator';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signUp(@Body() signInDto: SignDto) {
    const newUser = await this.authService.signUp(
      signInDto.login,
      signInDto.password,
    );
    return new ResponseUserDto(newUser);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignDto) {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() dto: refreshTokenDto) {
    return await this.authService.refresh(dto);
  }

  @Post('logout')
  @Public()
  @HttpCode(HttpStatus.OK)
  async logout(@Body() dto: refreshTokenDto): Promise<void> {
    await this.authService.logout(dto);
  }
}
