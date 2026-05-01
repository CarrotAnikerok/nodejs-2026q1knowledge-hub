import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { Storage } from 'src/common/base.storage';

@Injectable()
export class BaseDbStorage<T extends { id: string }> implements Storage<T> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly modelName: Prisma.ModelName,
    private readonly entityClass: new () => T,
  ) {}

  protected get model() {
    return this.prisma[this.modelName];
  }

  protected toEntity(data: any): T {
    return Object.assign(new this.entityClass(), data);
  }

  async create(dto: Partial<T>): Promise<T> {
    const { tags, ...rest } = dto as any;

    const row = {
      ...rest,
      ...(tags?.length > 0 && {
        tags: {
          connectOrCreate: tags.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      }),
    };

    await this.model.create({ data: row });

    return this.toEntity(row);
  }

  async findAll(): Promise<T[]> {
    const results = await this.model.findMany();
    return results.map((result: any) => this.toEntity(result));
  }

  async findById(id: T['id']): Promise<T | undefined> {
    const result = await this.model.findFirst({ where: { id } });
    return result ? this.toEntity(result) : undefined;
  }

  async update(id: T['id'], dto: Partial<T>): Promise<T> {
    return this.toEntity(await this.model.update({ where: { id }, data: dto }));
  }

  async delete(id: T['id']): Promise<void> {
    try {
      await this.model.delete({ where: { id } });
    } catch {
      return;
    }
  }
}
