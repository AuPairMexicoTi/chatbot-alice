import { registerAs } from '@nestjs/config';

export const conversationFlowConfig = registerAs('conversationFlow', () => ({
  inactivityTimeoutMinutes: Number.parseInt(
    process.env.CONVERSATION_INACTIVITY_TIMEOUT_MINUTES ?? '180',
    10,
  ),
  // Plazo sin actividad tras el cual una conversacion AWAITING_HUMAN
  // ("Esperando asesor") se trata como abandonada y vuelve al menu
  // principal -- ver ConversationFlowStateService.shouldRestart.
  awaitingHumanResetDays: Number.parseInt(
    process.env.CONVERSATION_AWAITING_HUMAN_RESET_DAYS ?? '7',
    10,
  ),
  publicBaseUrl: (process.env.CHATBOT_PUBLIC_BASE_URL ?? '').replace(
    /\/$/u,
    '',
  ),
}));

export type ConversationFlowConfig = ReturnType<typeof conversationFlowConfig>;
