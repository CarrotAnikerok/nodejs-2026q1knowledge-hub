import { IsNotEmpty, IsString } from 'class-validator';

export class SignDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
