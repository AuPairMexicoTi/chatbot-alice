import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  CONVERSATION_FLOW_INACTIVITY_TIMEOUT_MS,
  CONVERSATION_FLOW_NOW,
  ConversationFlowStateService,
} from './application/conversation-flow-state.service';
import { CONVERSATION_FLOW_STATE_REPOSITORY } from './application/ports/conversation-flow-state.repository';
import { PrismaConversationFlowStateRepository } from './infrastructure/repositories/prisma-conversation-flow-state.repository';
import { ConfigService } from '@nestjs/config';
import { APM_LEADS_PORT } from './application/ports/apm-leads.port';
import { APM_HANDOFF_PORT } from './application/ports/apm-handoff.port';
import { HttpApmHandoffAdapter } from './infrastructure/adapters/http-apm-handoff.adapter';
import { HttpApmLeadsAdapter } from './infrastructure/adapters/http-apm-leads.adapter';

@Module({
  providers: [
    ConversationFlowStateService,
    {
      provide: CONVERSATION_FLOW_INACTIVITY_TIMEOUT_MS,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.getOrThrow<number>('conversationFlow.inactivityTimeoutMinutes') *
        60 *
        1000,
    },
    {
      provide: CONVERSATION_FLOW_NOW,
      useValue: () => new Date(),
    },
    {
      provide: CONVERSATION_FLOW_STATE_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) =>
        new PrismaConversationFlowStateRepository(prisma),
    },
    {
      provide: APM_LEADS_PORT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new HttpApmLeadsAdapter(config),
    },
    {
      provide: APM_HANDOFF_PORT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new HttpApmHandoffAdapter(config),
    },
  ],
  exports: [ConversationFlowStateService, APM_LEADS_PORT, APM_HANDOFF_PORT],
})
export class ConversationFlowModule {}
