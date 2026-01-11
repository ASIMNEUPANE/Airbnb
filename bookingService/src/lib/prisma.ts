import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';
import { dbConfig } from "../config";

const adapter = new PrismaMariaDb({
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  port: 3306,
  connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });

export default prisma;