import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/users.entity';

export interface UserStorage {
  findAll(): User[];
  findById(id: string): User | undefined;
  create(articleDto: CreateUserDto): User;
  update(id: string, updatePasswordDto: UpdateUserDto): User | undefined;
  delete(id: string): void;
  findByLogin(login: string): User | undefined;
}
