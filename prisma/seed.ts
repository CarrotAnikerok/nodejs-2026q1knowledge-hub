import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Status } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminId = '39458825-4fa3-43e4-90f2-80731b42018d';
  const editorId = 'a5fbbcf8-6bbd-4b92-aa7c-b56515f4e44d';
  const admin = await prisma.user.upsert({
    where: { id: adminId },
    update: {},
    create: {
      id: adminId,
      login: 'alice@prisma.io',
      password: '123',
      role: Role.ADMIN,
    },
  });

  const editor = await prisma.user.upsert({
    where: { id: editorId },
    update: {},
    create: {
      id: editorId,
      login: 'bob@prisma.io',
      password: '1234',
      role: Role.EDITOR,
    },
  });

  const categoriesId = [
    '2ca60727-e4d2-4ee8-b994-adba5ef65c24',
    '0569329e-b35e-45a7-b77e-be0a0845051d',
    '3117c6ed-b065-4d4f-91ca-3217bc008e76',
  ];
  const categories = [
    await prisma.category.upsert({
      where: { id: categoriesId[0] },
      update: {},
      create: {
        id: categoriesId[0],
        name: 'Books',
        description: 'About books and stories',
      },
    }),
    await prisma.category.upsert({
      where: { id: categoriesId[1] },
      update: {},
      create: {
        id: categoriesId[1],
        name: 'Sports',
        description: 'About sports and winning',
      },
    }),
    await prisma.category.upsert({
      where: { id: categoriesId[2] },
      update: {},
      create: {
        id: categoriesId[2],
        name: 'Magic',
        description: 'About magic and wizards',
      },
    }),
  ];

  const tagNames = ['MLP', 'Harry Potter', 'Gravity Falls', 'Love', 'Plants'];
  const tags = [];

  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    tags.push(tag);
  }

  const articles = [
    await prisma.article.upsert({
      where: { id: '3117c6ed-b065-4d4f-91ca-3217bc008e76' },
      update: {},
      create: {
        id: '3117c6ed-b065-4d4f-91ca-3217bc008e76',
        title: 'First article',
        content: 'first',
        status: Status.ARCHIVED,
        authorId: admin.id,
        categoryId: categories[0].id,
        tags: {
          connect: [{ name: 'MLP' }],
        },
      },
    }),
    await prisma.article.upsert({
      where: { id: 'e92ae348-ecb0-4713-8550-4c2ab0bfcc08' },
      update: {},
      create: {
        id: 'e92ae348-ecb0-4713-8550-4c2ab0bfcc08',
        title: 'Second article',
        content: 'second',
        status: Status.DRAFT,
        authorId: admin.id,
        categoryId: categories[1].id,
        tags: {
          connect: [{ name: 'Love' }, { name: 'Gravity Falls' }],
        },
      },
    }),
    await prisma.article.upsert({
      where: { id: '2db5ae9f-eada-4fef-8c95-9dbb33e7ada5' },
      update: {},
      create: {
        id: '2db5ae9f-eada-4fef-8c95-9dbb33e7ada5',
        title: 'Third article',
        content: 'third',
        status: Status.DRAFT,
        authorId: editor.id,
        categoryId: categories[2].id,
        tags: {
          connect: [{ name: 'Plants' }],
        },
      },
    }),
    await prisma.article.upsert({
      where: { id: '26ff4671-0f60-455a-80a4-866a8ab28dbf' },
      update: {},
      create: {
        id: '26ff4671-0f60-455a-80a4-866a8ab28dbf',
        title: 'Fourth article',
        content: 'fourth',
        status: Status.PUBLISHED,
        authorId: editor.id,
        categoryId: categories[0].id,
        tags: {
          connect: [{ name: 'Harry Potter' }],
        },
      },
    }),
    await prisma.article.upsert({
      where: { id: '02975bd7-406c-4d84-a908-799c6161fc1b' },
      update: {},
      create: {
        id: '02975bd7-406c-4d84-a908-799c6161fc1b',
        title: 'Fifth article',
        content: 'fifth',
        status: Status.PUBLISHED,
        authorId: editor.id,
        categoryId: categories[0].id,
        tags: {
          connect: [{ name: 'MLP' }],
        },
      },
    }),
  ];

  await prisma.comment.upsert({
    where: { id: 'bf9c8eff-d7c6-44c4-9733-3180bbf44ecd' },
    update: {},
    create: {
      id: 'bf9c8eff-d7c6-44c4-9733-3180bbf44ecd',
      content: 'first comment',
      authorId: editor.id,
      articleId: articles[0].id,
    },
  });

  await prisma.comment.upsert({
    where: { id: '63420af1-aa4e-4205-855e-60cf26076251' },
    update: {},
    create: {
      id: '63420af1-aa4e-4205-855e-60cf26076251',
      content: 'second comment',
      authorId: admin.id,
      articleId: articles[4].id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 'add9e57d-ca0c-4109-ad35-50ab394bb6fe' },
    update: {},
    create: {
      id: 'add9e57d-ca0c-4109-ad35-50ab394bb6fe',
      content: 'third comment',
      authorId: admin.id,
      articleId: articles[3].id,
    },
  });

  console.log({ admin, editor, categories, articles, tags });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
