import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  CONVERSATION_FLOW_INACTIVITY_TIMEOUT_MS,
  CONVERSATION_FLOW_NOW,
  ConversationFlowStateService,
} from './application/conversation-flow-state.service';
import { CONVERSATION_FLOW_STATE_REPOSITORY } from './application/ports/conversation-flow-state.repository';
import { PrismaConversationFlowStateRepository } from './infrastructure/repositories/prisma-conversation-flow-state.repository';
import { FLOW_DEFINITION_REPOSITORY } from './application/ports/flow-definition.repository';
import { PrismaFlowDefinitionRepository } from './infrastructure/repositories/prisma-flow-definition.repository';
import { InMemoryFlowDefinitionRepository } from './infrastructure/repositories/in-memory-flow-definition.repository';
import { ConfigService } from '@nestjs/config';
import { APM_LEADS_PORT } from './application/ports/apm-leads.port';
import { APM_HANDOFF_PORT } from './application/ports/apm-handoff.port';
import { HttpApmHandoffAdapter } from './infrastructure/adapters/http-apm-handoff.adapter';
import { HttpApmLeadsAdapter } from './infrastructure/adapters/http-apm-leads.adapter';
import { ConversationFlowController } from './presentation/conversation-flow.controller';
import { CreateFlowNodeUseCase } from './application/use-cases/create-flow-node.use-case';
import { UpdateFlowNodeUseCase } from './application/use-cases/update-flow-node.use-case';
import { DeleteFlowNodeUseCase } from './application/use-cases/delete-flow-node.use-case';

@Module({
  controllers: [ConversationFlowController],
  providers: [
    ConversationFlowStateService,
    CreateFlowNodeUseCase,
    UpdateFlowNodeUseCase,
    DeleteFlowNodeUseCase,
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
      provide: FLOW_DEFINITION_REPOSITORY,
      inject: [ConfigService, PrismaService],
      useFactory: (configService: ConfigService, prisma: PrismaService) =>
        configService.get<string>('app.nodeEnv') === 'test'
          ? new InMemoryFlowDefinitionRepository()
          : new PrismaFlowDefinitionRepository(prisma),
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
