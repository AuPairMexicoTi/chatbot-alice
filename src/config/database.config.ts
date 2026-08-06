import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL ?? '',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number.parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  user: process.env.POSTGRES_USER ?? 'alice',
  password: process.env.POSTGRES_PASSWORD ?? '',
  database: process.env.POSTGRES_DB ?? 'chatbot_alice',
}));

export type DatabaseConfig = ReturnType<typeof databaseConfig>;
