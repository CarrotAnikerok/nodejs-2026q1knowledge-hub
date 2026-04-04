import { Exclude } from 'class-transformer';
import { UserRole } from 'src/constants/enums';

export class ResponseUserDto {
  id: string;
  login: string;
  role: UserRole;

  @Exclude()
  password: string;

  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
