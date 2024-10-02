// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Check if the application is running in production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, keep the Prisma Client alive
  // This is useful for hot-reloading in development
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;