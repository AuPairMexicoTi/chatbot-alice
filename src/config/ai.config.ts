import { registerAs } from '@nestjs/config';

export const aiConfig = registerAs('ai', () => ({
  provider: process.env.AI_PROVIDER ?? 'mock',
  apiKey: process.env.OPENAI_API_KEY ?? '',
  model: process.env.OPENAI_MODEL ?? '',
  timeoutMs: Number.parseInt(process.env.OPENAI_TIMEOUT_MS ?? '30000', 10),
  maxOutputTokens: Number.parseInt(
    process.env.OPENAI_MAX_OUTPUT_TOKENS ?? '600',
    10,
  ),
  store: process.env.OPENAI_STORE === 'true',
}));

export type AiConfig = ReturnType<typeof aiConfig>;
