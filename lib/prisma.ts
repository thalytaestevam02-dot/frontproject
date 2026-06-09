import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const libsql = createClient({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
});

const prismaClient = new PrismaClient({
  adapter: new PrismaLibSql(libsql),
});

export const prisma = globalForPrisma.prisma ?? prismaClient;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
