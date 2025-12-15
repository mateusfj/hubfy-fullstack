import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5,
});

const globalPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma: PrismaClient =
  globalPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;

export { prisma };
