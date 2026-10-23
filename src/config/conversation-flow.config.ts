import { registerAs } from '@nestjs/config';

export const conversationFlowConfig = registerAs('conversationFlow', () => ({
  inactivityTimeoutMinutes: Number.parseInt(
    process.env.CONVERSATION_INACTIVITY_TIMEOUT_MINUTES ?? '180',
    10,
  ),
  publicBaseUrl: (process.env.CHATBOT_PUBLIC_BASE_URL ?? '').replace(
    /\/$/u,
    '',
  ),
  profilingLink: process.env.AUPAIR_PROFILING_LINK ?? '',
}));

export type ConversationFlowConfig = ReturnType<typeof conversationFlowConfig>;
