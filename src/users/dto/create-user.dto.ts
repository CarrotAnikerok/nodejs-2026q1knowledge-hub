import { IsAlphanumeric, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/constants/enums';

export class CreateUserDto {
  @IsAlphanumeric()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
