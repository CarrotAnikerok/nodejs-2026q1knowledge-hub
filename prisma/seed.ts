import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Status } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.upsert({
    where: { id: '39458825-4fa3-43e4-90f2-80731b42018d' },
    update: {},
    create: {
      id: '39458825-4fa3-43e4-90f2-80731b42018d',
      login: 'alice@prisma.io',
      password: '123',
      role: Role.ADMIN,

      articles: {
        create: {
          id: 'ae72d3df-f1bc-484e-a15f-da7cb47d711e',
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          status: Status.PUBLISHED,
        },
      },
    },
  });
  const editor = await prisma.user.upsert({
    where: { id: 'a5fbbcf8-6bbd-4b92-aa7c-b56515f4e44d' },
    update: {},
    create: {
      id: 'a5fbbcf8-6bbd-4b92-aa7c-b56515f4e44d',
      login: 'bob@prisma.io',
      password: '1234',
      role: Role.EDITOR,

      articles: {
        create: [
          {
            id: '2cb8c6e7-1d6e-418f-9a19-27c58ad6cf51',
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            status: Status.ARCHIVED,
          },
          {
            id: 'fdfd42af-cb31-46a9-b844-2bd9d174107f',
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            status: Status.DRAFT,
          },
        ],
      },
    },
  });
  const books = await prisma.category.upsert({
    where: { id: '2ca60727-e4d2-4ee8-b994-adba5ef65c24' },
    update: {},
    create: {
      id: '2ca60727-e4d2-4ee8-b994-adba5ef65c24',
      name: 'Books',
      description: 'About books and stories',
    },
  });

  const sports = await prisma.category.upsert({
    where: { id: '0569329e-b35e-45a7-b77e-be0a0845051d' },
    update: {},
    create: {
      id: '0569329e-b35e-45a7-b77e-be0a0845051d',
      name: 'Sports',
      description: 'About sports and winning',
    },
  });

  const magic = await prisma.category.upsert({
    where: { id: '3117c6ed-b065-4d4f-91ca-3217bc008e76' },
    update: {},
    create: {
      id: '3117c6ed-b065-4d4f-91ca-3217bc008e76',
      name: 'Magic',
      description: 'About magic and wizards',
    },
  });

  const tagNames = ['MLP', 'Harry Potter', 'Gravity Falls', 'Love', 'Plants'];
  const tags = await Promise.all(
    tagNames.map((name) => {
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }),
  );

  const firstArticle = await prisma.article.upsert({
    where: { id: '3117c6ed-b065-4d4f-91ca-3217bc008e76' },
    update: {},
    create: {
      id: '3117c6ed-b065-4d4f-91ca-3217bc008e76',
      title: 'First article',
      content: 'first',
      status: Status.ARCHIVED,
      authorId: admin.id,
      categoryId: books.id,
      tags: {
        connect: [{ name: 'MLP' }],
      },
    },
  });

  await prisma.article.upsert({
    where: { id: 'e92ae348-ecb0-4713-8550-4c2ab0bfcc08' },
    update: {},
    create: {
      id: 'e92ae348-ecb0-4713-8550-4c2ab0bfcc08',
      title: 'Second article',
      content: 'second',
      status: Status.DRAFT,
      authorId: admin.id,
      categoryId: magic.id,
      tags: {
        connect: [{ name: 'Love' }, { name: 'Gravity Falls' }],
      },
    },
  });

  await prisma.article.upsert({
    where: { id: '2db5ae9f-eada-4fef-8c95-9dbb33e7ada5' },
    update: {},
    create: {
      id: '2db5ae9f-eada-4fef-8c95-9dbb33e7ada5',
      title: 'Third article',
      content: 'third',
      status: Status.DRAFT,
      authorId: editor.id,
      categoryId: sports.id,
      tags: {
        connect: [{ name: 'Plants' }],
      },
    },
  });

  const fourthArticle = await prisma.article.upsert({
    where: { id: '2db5ae9f-eada-4fef-8c95-9dbb33e7ada5' },
    update: {},
    create: {
      id: '2db5ae9f-eada-4fef-8c95-9dbb33e7ada5',
      title: 'Fourth article',
      content: 'fourth',
      status: Status.PUBLISHED,
      authorId: editor.id,
      categoryId: books.id,
      tags: {
        connect: [{ name: 'Harry Potter' }],
      },
    },
  });

  const fifthArticle = await prisma.article.upsert({
    where: { id: '02975bd7-406c-4d84-a908-799c6161fc1b' },
    update: {},
    create: {
      id: '02975bd7-406c-4d84-a908-799c6161fc1b',
      title: 'Fifth article',
      content: 'fifth',
      status: Status.PUBLISHED,
      authorId: editor.id,
      categoryId: books.id,
      tags: {
        connect: [{ name: 'MLP' }],
      },
    },
  });

  await prisma.comment.upsert({
    where: { id: 'bf9c8eff-d7c6-44c4-9733-3180bbf44ecd' },
    update: {},
    create: {
      id: 'bf9c8eff-d7c6-44c4-9733-3180bbf44ecd',
      content: 'first comment',
      authorId: editor.id,
      articleId: firstArticle.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: '63420af1-aa4e-4205-855e-60cf26076251' },
    update: {},
    create: {
      id: '63420af1-aa4e-4205-855e-60cf26076251',
      content: 'second comment',
      authorId: admin.id,
      articleId: fifthArticle.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 'add9e57d-ca0c-4109-ad35-50ab394bb6fe' },
    update: {},
    create: {
      id: 'add9e57d-ca0c-4109-ad35-50ab394bb6fe',
      content: 'third comment',
      authorId: admin.id,
      articleId: fourthArticle.id,
    },
  });

  console.log({ admin, editor, books, sports, magic, tags });
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
