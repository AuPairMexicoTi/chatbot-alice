import { registerAs } from '@nestjs/config';

export const dataRetentionConfig = registerAs('dataRetention', () => ({
  // Ambos valores por defecto son los seguros: la purga borra datos de forma
  // irreversible, asi que solo corre si se activa de forma explicita y solo
  // borra de verdad si ademas se apaga la simulacion.
  enabled: process.env.RETENTION_ENABLED === 'true',
  dryRun: process.env.RETENTION_DRY_RUN !== 'false',
  conversationMonths: Number.parseInt(
    process.env.RETENTION_CONVERSATION_MONTHS ?? '6',
    10,
  ),
  webhookDays: Number.parseInt(process.env.RETENTION_WEBHOOK_DAYS ?? '30', 10),
  batchSize: Number.parseInt(process.env.RETENTION_BATCH_SIZE ?? '200', 10),
}));

export type DataRetentionConfig = ReturnType<typeof dataRetentionConfig>;
