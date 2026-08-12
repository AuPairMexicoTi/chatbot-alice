import { registerAs } from '@nestjs/config';

export const aiConfig = registerAs('ai', () => ({
  provider: process.env.AI_PROVIDER ?? 'mock',
  model:
    process.env.AI_MODEL ??
    (process.env.AI_PROVIDER === 'mock' ? 'mock-alice' : ''),
  timeoutMs: Number.parseInt(process.env.AI_TIMEOUT_MS ?? '30000', 10),
  maxOutputTokens: Number.parseInt(
    process.env.AI_MAX_OUTPUT_TOKENS ?? '600',
    10,
  ),
  store: process.env.AI_STORE === 'true',
  openAiApiKey: process.env.OPENAI_API_KEY ?? '',
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
}));

export type AiConfig = ReturnType<typeof aiConfig>;
