import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { AI_RUN_REPOSITORY } from '@modules/ai/application/ports/ai-run.repository';
import { CHATBOT_TOOLS as CHATBOT_TOOLS_TOKEN } from '@modules/ai/application/ports/chatbot-tool';
import { AutoRepliesModule } from '@modules/auto-replies/auto-replies.module';
import { ResolveAutoReplyUseCase } from '@modules/auto-replies/application/use-cases/resolve-auto-reply.use-case';
import { CONTACT_REPOSITORY } from '@modules/contacts/application/ports/contact.repository';
import { CONVERSATION_REPOSITORY } from '@modules/conversations/application/ports/conversation.repository';
import { HANDOFF_REPOSITORY } from '@modules/handoff/application/ports/handoff.repository';
import { RequestHumanHandoffTool } from '@modules/handoff/infrastructure/tools/request-human-handoff.tool';
import { MESSAGE_REPOSITORY } from '@modules/messaging/application/ports/message.repository';
import { AI_GATEWAY as AI_GATEWAY_TOKEN } from '@modules/ai/application/ports/ai-gateway';
import { GeminiGateway } from '@modules/ai/infrastructure/adapters/gemini.gateway';
import { MockAiGateway } from '@modules/ai/infrastructure/adapters/mock-ai.gateway';
import { OpenAiResponsesGateway } from '@modules/ai/infrastructure/adapters/openai-responses.gateway';
import { WEBHOOK_EVENT_REPOSITORY } from '@modules/webhooks/application/ports/webhook-event.repository';
import {
  INBOUND_QUEUE_PORT,
  OUTBOUND_QUEUE_PORT,
} from './application/ports/queue.port';
import { WEBHOOK_VERIFIER } from './application/ports/webhook-verifier';
import { GenerateConversationReplyUseCase } from './application/use-cases/generate-conversation-reply.use-case';
import { ProcessInboundWhatsAppMessageUseCase } from './application/use-cases/process-inbound-whatsapp-message.use-case';
import { QueueOutboundMessageUseCase } from './application/use-cases/queue-outbound-message.use-case';
import { RequestHumanHandoffUseCase } from './application/use-cases/request-human-handoff.use-case';
import { SendOutboundWhatsAppMessageUseCase } from './application/use-cases/send-outbound-whatsapp-message.use-case';
import { BullInboundQueueAdapter } from './infrastructure/adapters/bull-inbound-queue.adapter';
import { BullOutboundQueueAdapter } from './infrastructure/adapters/bull-outbound-queue.adapter';
import { InMemoryQueueAdapter } from './infrastructure/adapters/in-memory-queue.adapter';
import { MetaWhatsAppGateway } from './infrastructure/adapters/meta-whatsapp.gateway';
import { MockWhatsAppGateway } from './infrastructure/adapters/mock-whatsapp.gateway';
import { WhatsAppWebhookParser } from './infrastructure/parsers/whatsapp-webhook.parser';
import { WhatsAppInboundProcessor } from './infrastructure/processors/whatsapp-inbound.processor';
import { WhatsAppOutboundProcessor } from './infrastructure/processors/whatsapp-outbound.processor';
import { MetaWebhookVerifierService } from './infrastructure/services/meta-webhook-verifier.service';
import { WHATSAPP_GATEWAY } from './domain/whatsapp-gateway';
import { InMemoryAiRunRepository } from '@modules/persistence/infrastructure/repositories/in-memory-ai-run.repository';
import { InMemoryContactRepository } from '@modules/persistence/infrastructure/repositories/in-memory-contact.repository';
import { InMemoryConversationRepository } from '@modules/persistence/infrastructure/repositories/in-memory-conversation.repository';
import { InMemoryHandoffRepository } from '@modules/persistence/infrastructure/repositories/in-memory-handoff.repository';
import { InMemoryMessageRepository } from '@modules/persistence/infrastructure/repositories/in-memory-message.repository';
import { InMemoryStore } from '@modules/persistence/infrastructure/repositories/in-memory.store';
import { InMemoryWebhookEventRepository } from '@modules/persistence/infrastructure/repositories/in-memory-webhook-event.repository';

@Module({
  imports: [
    AutoRepliesModule,
    BullModule.registerQueue(
      { name: 'whatsapp-inbound' },
      { name: 'whatsapp-outbound' },
    ),
  ],
  providers: [
    InMemoryStore,
    InMemoryContactRepository,
    InMemoryConversationRepository,
    InMemoryMessageRepository,
    InMemoryWebhookEventRepository,
    InMemoryAiRunRepository,
    InMemoryHandoffRepository,
    MockWhatsAppGateway,
    MetaWhatsAppGateway,
    InMemoryQueueAdapter,
    BullInboundQueueAdapter,
    BullOutboundQueueAdapter,
    MetaWebhookVerifierService,
    WhatsAppWebhookParser,
    WhatsAppInboundProcessor,
    WhatsAppOutboundProcessor,
    GenerateConversationReplyUseCase,
    ProcessInboundWhatsAppMessageUseCase,
    QueueOutboundMessageUseCase,
    SendOutboundWhatsAppMessageUseCase,
    RequestHumanHandoffUseCase,
    RequestHumanHandoffTool,
    {
      provide: CONTACT_REPOSITORY,
      useExisting: InMemoryContactRepository,
    },
    {
      provide: CONVERSATION_REPOSITORY,
      useExisting: InMemoryConversationRepository,
    },
    {
      provide: MESSAGE_REPOSITORY,
      useExisting: InMemoryMessageRepository,
    },
    {
      provide: WEBHOOK_EVENT_REPOSITORY,
      useExisting: InMemoryWebhookEventRepository,
    },
    {
      provide: AI_RUN_REPOSITORY,
      useExisting: InMemoryAiRunRepository,
    },
    {
      provide: HANDOFF_REPOSITORY,
      useExisting: InMemoryHandoffRepository,
    },
    {
      provide: AI_GATEWAY_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const provider = configService.getOrThrow<string>('ai.provider');

        if (provider === 'openai') {
          return new OpenAiResponsesGateway(configService);
        }

        if (provider === 'gemini') {
          return new GeminiGateway(configService);
        }

        return new MockAiGateway();
      },
    },
    {
      provide: WHATSAPP_GATEWAY,
      inject: [ConfigService, MockWhatsAppGateway, MetaWhatsAppGateway],
      useFactory: (
        configService: ConfigService,
        mockWhatsAppGateway: MockWhatsAppGateway,
        metaWhatsAppGateway: MetaWhatsAppGateway,
      ) =>
        configService.get<string>('whatsapp.provider') === 'meta'
          ? metaWhatsAppGateway
          : mockWhatsAppGateway,
    },
    {
      provide: WEBHOOK_VERIFIER,
      useExisting: MetaWebhookVerifierService,
    },
    {
      provide: INBOUND_QUEUE_PORT,
      inject: [ConfigService, InMemoryQueueAdapter, BullInboundQueueAdapter],
      useFactory: (
        configService: ConfigService,
        inMemoryQueueAdapter: InMemoryQueueAdapter,
        bullInboundQueueAdapter: BullInboundQueueAdapter,
      ) =>
        configService.get<string>('app.nodeEnv') === 'test'
          ? inMemoryQueueAdapter
          : bullInboundQueueAdapter,
    },
    {
      provide: OUTBOUND_QUEUE_PORT,
      inject: [ConfigService, InMemoryQueueAdapter, BullOutboundQueueAdapter],
      useFactory: (
        configService: ConfigService,
        inMemoryQueueAdapter: InMemoryQueueAdapter,
        bullOutboundQueueAdapter: BullOutboundQueueAdapter,
      ) =>
        configService.get<string>('app.nodeEnv') === 'test'
          ? inMemoryQueueAdapter
          : bullOutboundQueueAdapter,
    },
    {
      provide: CHATBOT_TOOLS_TOKEN,
      useFactory: (requestHumanHandoffTool: RequestHumanHandoffTool) => [
        requestHumanHandoffTool,
      ],
      inject: [RequestHumanHandoffTool],
    },
  ],
  exports: [
    WhatsAppWebhookParser,
    WEBHOOK_VERIFIER,
    INBOUND_QUEUE_PORT,
    OUTBOUND_QUEUE_PORT,
    ProcessInboundWhatsAppMessageUseCase,
    QueueOutboundMessageUseCase,
    SendOutboundWhatsAppMessageUseCase,
    RequestHumanHandoffUseCase,
    CONTACT_REPOSITORY,
    CONVERSATION_REPOSITORY,
    MESSAGE_REPOSITORY,
    WEBHOOK_EVENT_REPOSITORY,
    AI_GATEWAY_TOKEN,
    AI_RUN_REPOSITORY,
    HANDOFF_REPOSITORY,
    CHATBOT_TOOLS_TOKEN,
  ],
})
export class WhatsAppModule {}
