import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InMemoryUsersStore } from './store/users.storage';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private storage: InMemoryUsersStore) {}

  create(createUserDto: CreateUserDto): ResponseUserDto {
    return this.storage.create(createUserDto);
  }

  findAll(): ResponseUserDto[] {
    return this.storage.findAll();
  }

  findOne(id: string): ResponseUserDto {
    return this.storage.findById(id);
  }

  update(id: string, passwordData: UpdatePasswordDto): ResponseUserDto {
    return this.storage.update(id, passwordData);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
