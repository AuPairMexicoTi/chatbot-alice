import { registerAs } from '@nestjs/config';

export const conversationFlowConfig = registerAs('conversationFlow', () => ({
  inactivityTimeoutMinutes: Number.parseInt(
    process.env.CONVERSATION_INACTIVITY_TIMEOUT_MINUTES ?? '180',
    10,
  ),
}));

export type ConversationFlowConfig = ReturnType<typeof conversationFlowConfig>;
