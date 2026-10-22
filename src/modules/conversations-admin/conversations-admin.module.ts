import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { CrmSecretGuard } from '@shared/presentation/guards/crm-secret.guard';
import { CONVERSATION_QUERY_PORT } from './application/ports/conversation-query.port';
import { ListConversationsUseCase } from './application/use-cases/list-conversations.use-case';
import { GetConversationUseCase } from './application/use-cases/get-conversation.use-case';
import { ListConversationMessagesUseCase } from './application/use-cases/list-conversation-messages.use-case';
import { GetConversationFlowStateUseCase } from './application/use-cases/get-conversation-flow-state.use-case';
import { InMemoryConversationQueryRepository } from './infrastructure/repositories/in-memory-conversation-query.repository';
import { PrismaConversationQueryRepository } from './infrastructure/repositories/prisma-conversation-query.repository';
import { ConversationsAdminController } from './presentation/conversations-admin.controller';

@Module({
  controllers: [ConversationsAdminController],
  providers: [
    ListConversationsUseCase,
    GetConversationUseCase,
    ListConversationMessagesUseCase,
    GetConversationFlowStateUseCase,
    CrmSecretGuard,
    {
      provide: CONVERSATION_QUERY_PORT,
      inject: [ConfigService, PrismaService],
      useFactory: (
        configService: ConfigService,
        prismaService: PrismaService,
      ) =>
        configService.get<string>('app.nodeEnv') === 'test'
          ? new InMemoryConversationQueryRepository()
          : new PrismaConversationQueryRepository(prismaService),
    },
  ],
})
export class ConversationsAdminModule {}
