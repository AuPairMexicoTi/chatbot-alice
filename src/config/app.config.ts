import { registerAs } from '@nestjs/config';

const splitOrigins = (value: string): string[] =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

export const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME ?? 'chatbot-alice',
  displayName: process.env.APP_DISPLAY_NAME ?? 'ALICE',
  meaning: 'Artificial Labile Intelligence Cybernetic Existence',
  port: Number.parseInt(process.env.APP_PORT ?? '3000', 10),
  prefix: process.env.APP_PREFIX ?? 'api/v1',
  corsOrigins: splitOrigins(process.env.APP_CORS_ORIGINS ?? ''),
  bodyLimit: process.env.APP_BODY_LIMIT ?? '1mb',
  swaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  nodeEnv: process.env.NODE_ENV ?? 'development',
}));

export type AppConfig = ReturnType<typeof appConfig>;
