import { BaseDbStorage } from 'src/common/base.db.storage';
import { Category } from '../entities/category.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryDbStorage extends BaseDbStorage<Category> {
  constructor(service: PrismaService) {
    super(service, Prisma.ModelName.Category, Category);
  }
}
