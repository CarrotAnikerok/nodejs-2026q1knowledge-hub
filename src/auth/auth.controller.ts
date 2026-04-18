import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sing-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  signUp(@Body() signInDto: SignDto) {
    return this.authService.signUp(signInDto.login, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }
}
