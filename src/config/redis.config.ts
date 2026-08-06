import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: Number.parseInt(process.env.REDIS_PORT ?? '6379', 10),
  password: process.env.REDIS_PASSWORD ?? '',
  db: Number.parseInt(process.env.REDIS_DB ?? '0', 10),
  prefix: process.env.BULLMQ_PREFIX ?? 'alice',
  inboundQueue: process.env.WHATSAPP_INBOUND_QUEUE ?? 'whatsapp-inbound',
  outboundQueue: process.env.WHATSAPP_OUTBOUND_QUEUE ?? 'whatsapp-outbound',
  attempts: Number.parseInt(process.env.QUEUE_ATTEMPTS ?? '5', 10),
  backoffMs: Number.parseInt(process.env.QUEUE_BACKOFF_MS ?? '3000', 10),
}));

export type RedisConfig = ReturnType<typeof redisConfig>;
