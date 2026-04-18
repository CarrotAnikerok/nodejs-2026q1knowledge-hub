import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sing-auth.dto';
import { refreshTokenDto } from './dto/refresh-token.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  signUp(@Body() signInDto: SignDto) {
    return this.authService.signUp(signInDto.login, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() dto: refreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
