import { Injectable } from '@nestjs/common';
import { BaseDbStorage } from 'src/common/base.db.storage';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../entities/users.entity';
import { Prisma, Role } from 'src/generated/prisma/client';
import { Storage } from 'src/common/base.storage';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from 'src/constants/enums';

@Injectable()
export class UserDbStorage
  extends BaseDbStorage<User>
  implements Storage<User>
{
  constructor(service: PrismaService) {
    super(service, Prisma.ModelName.User, User);
  }

  toPrismaUserRole(role: UserRole): Role {
    const mapRoleObject = {
      [UserRole.ADMIN]: Role.admin,
      [UserRole.EDITOR]: Role.editor,
      [UserRole.VIEWER]: Role.viewer,
    };

    return mapRoleObject[role];
  }

  toApiUserRole(role: Role): UserRole {
    const mapRoleObject = {
      [Role.admin]: UserRole.ADMIN,
      [Role.editor]: UserRole.EDITOR,
      [Role.viewer]: UserRole.VIEWER,
    };

    return mapRoleObject[role];
  }

  async create(dto: CreateUserDto): Promise<User> {
    const role = this.toPrismaUserRole(dto.role || UserRole.VIEWER);
    const row = await this.model.create({
      data: { login: dto.login, password: dto.password, role },
    });

    row.role = this.toApiUserRole(row.role);

    return this.toEntity(row);
  }

  async findByLogin(login: string): Promise<User | undefined> {
    const result = await this.model.findFirst({ where: { login } });
    return result ? this.toEntity(result) : undefined;
  }
}
