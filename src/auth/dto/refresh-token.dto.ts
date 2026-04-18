import { IsOptional, IsString } from 'class-validator';

export class refreshTokenDto {
  @IsString()
  @IsOptional()
  refreshToken: string;
}
