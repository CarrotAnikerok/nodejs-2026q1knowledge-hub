import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/users.entity';
import { Injectable } from '@nestjs/common';
import { UserStorage } from '../interfaces/users.storage.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRole } from 'src/constants/enums';

@Injectable()
export class InMemoryUsersStore implements UserStorage {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByLogin(login: string): User | undefined {
    return this.users.find((user) => user.login === login);
  }

  create(userDto: CreateUserDto): User {
    const newUser: User = {
      ...userDto,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (!newUser.role) {
      newUser.role = UserRole.VIEWER;
    }

    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): User | undefined {
    const userToUpdate = this.findById(id);
    Object.assign(userToUpdate, updateUserDto);
    userToUpdate.updatedAt = Date.now();

    return userToUpdate;
  }

  delete(id: string): void {
    const userToDelete = this.findById(id);
    const userIndex = this.users.indexOf(userToDelete);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }
}
