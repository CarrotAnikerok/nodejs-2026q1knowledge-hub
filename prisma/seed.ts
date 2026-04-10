import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Status } from '../src/generated/prisma/client';
import { create } from 'domain';

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
      title: 'First asrticle',
      content: 'harry potter',
      status: Status.ARCHIVED,
      authorId: admin.id,
      categoryId: books.id,
      tags: {
        connect: [{ name: 'MLP' }],
      },
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
