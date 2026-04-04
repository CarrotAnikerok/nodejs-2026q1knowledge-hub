import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUsersStore {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(userDto: CreateUserDto): User {
    const newUser: User = {
      ...userDto,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: string, passwordData: UpdatePasswordDto): User | undefined {
    const userToUpdate = this.findById(id);
    console.log(JSON.stringify(userToUpdate));

    if (userToUpdate.password === passwordData.oldPassword) {
      userToUpdate.password = passwordData.newPassword;
    } else {
      throw Error('password is wrong');
    }

    return userToUpdate;
  }

  delete(id: string): void {
    const userToDelete = this.findById(id);
    const userIndex = this.users.indexOf(userToDelete);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    } else {
      throw Error('User doesn`t exist');
    }
  }
}
