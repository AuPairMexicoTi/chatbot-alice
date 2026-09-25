import { registerAs } from '@nestjs/config';

export const mediaConfig = registerAs('media', () => ({
  publicBaseUrl: process.env.CHATBOT_PUBLIC_BASE_URL ?? '',
}));

export type MediaConfig = ReturnType<typeof mediaConfig>;
