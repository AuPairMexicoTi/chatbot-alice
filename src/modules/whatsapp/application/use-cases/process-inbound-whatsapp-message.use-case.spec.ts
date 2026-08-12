import { InMemoryAutoReplyRepository } from '@modules/auto-replies/infrastructure/repositories/in-memory-auto-reply.repository';
import { ResolveAutoReplyUseCase } from '@modules/auto-replies/application/use-cases/resolve-auto-reply.use-case';
import { RequestHumanHandoffTool } from '@modules/handoff/infrastructure/tools/request-human-handoff.tool';
import { InMemoryAiRunRepository } from '@modules/persistence/infrastructure/repositories/in-memory-ai-run.repository';
import { InMemoryContactRepository } from '@modules/persistence/infrastructure/repositories/in-memory-contact.repository';
import { InMemoryConversationRepository } from '@modules/persistence/infrastructure/repositories/in-memory-conversation.repository';
import { InMemoryHandoffRepository } from '@modules/persistence/infrastructure/repositories/in-memory-handoff.repository';
import { InMemoryMessageRepository } from '@modules/persistence/infrastructure/repositories/in-memory-message.repository';
import { InMemoryStore } from '@modules/persistence/infrastructure/repositories/in-memory.store';
import { MockAiGateway } from '@modules/ai/infrastructure/adapters/mock-ai.gateway';
import { InMemoryQueueAdapter } from '../../infrastructure/adapters/in-memory-queue.adapter';
import { GenerateConversationReplyUseCase } from './generate-conversation-reply.use-case';
import { ProcessInboundWhatsAppMessageUseCase } from './process-inbound-whatsapp-message.use-case';
import { QueueOutboundMessageUseCase } from './queue-outbound-message.use-case';
import { RequestHumanHandoffUseCase } from './request-human-handoff.use-case';

describe('ProcessInboundWhatsAppMessageUseCase', () => {
  it('processes a text message and uses the mock ai gateway', async () => {
    const store = new InMemoryStore();
    const contactRepository = new InMemoryContactRepository(store);
    const conversationRepository = new InMemoryConversationRepository(store);
    const messageRepository = new InMemoryMessageRepository(store);
    const aiRunRepository = new InMemoryAiRunRepository(store);
    const handoffRepository = new InMemoryHandoffRepository(store);
    const queue = new InMemoryQueueAdapter();
    const handoffUseCase = new RequestHumanHandoffUseCase(
      handoffRepository,
      conversationRepository,
    );
    const generateConversationReplyUseCase =
      new GenerateConversationReplyUseCase(
        new MockAiGateway(),
        aiRunRepository,
        messageRepository,
        [new RequestHumanHandoffTool(handoffUseCase)],
      );
    const resolveAutoReplyUseCase = new ResolveAutoReplyUseCase(
      new InMemoryAutoReplyRepository(),
    );
    const useCase = new ProcessInboundWhatsAppMessageUseCase(
      contactRepository,
      conversationRepository,
      messageRepository,
      resolveAutoReplyUseCase,
      generateConversationReplyUseCase,
      new QueueOutboundMessageUseCase(queue),
    );

    await useCase.execute({
      externalId: 'wamid.1',
      eventType: 'text',
      contactExternalId: '5215550000001',
      contactName: 'Cliente Demo',
      from: '5215550000001',
      messageId: 'wamid.1',
      messageType: 'TEXT',
      text: 'Hola ALICE',
      locale: 'es-MX',
      payload: {},
    });

    expect(store.messages.size).toBe(2);
    expect(queue.outboundJobs).toHaveLength(1);
    const outbound = [...store.messages.values()].find(
      (message) => message.direction === 'OUTBOUND',
    );
    expect(outbound?.text).toContain('ALICE');
  });

  it('uses an auto reply before calling ai', async () => {
    const store = new InMemoryStore();
    const contactRepository = new InMemoryContactRepository(store);
    const conversationRepository = new InMemoryConversationRepository(store);
    const messageRepository = new InMemoryMessageRepository(store);
    const aiRunRepository = new InMemoryAiRunRepository(store);
    const handoffRepository = new InMemoryHandoffRepository(store);
    const queue = new InMemoryQueueAdapter();
    const handoffUseCase = new RequestHumanHandoffUseCase(
      handoffRepository,
      conversationRepository,
    );
    const generateConversationReplyUseCase =
      new GenerateConversationReplyUseCase(
        new MockAiGateway(),
        aiRunRepository,
        messageRepository,
        [new RequestHumanHandoffTool(handoffUseCase)],
      );
    const resolveAutoReplyUseCase = new ResolveAutoReplyUseCase(
      new InMemoryAutoReplyRepository([
        {
          id: 'reply-1',
          key: 'business_hours',
          title: 'Business hours',
          matchType: 'CONTAINS',
          patterns: ['horario'],
          responseText: 'Nuestro horario es de lunes a viernes de 9:00 a 18:00.',
          priority: 10,
          isActive: true,
          locale: 'es-MX',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    );
    const useCase = new ProcessInboundWhatsAppMessageUseCase(
      contactRepository,
      conversationRepository,
      messageRepository,
      resolveAutoReplyUseCase,
      generateConversationReplyUseCase,
      new QueueOutboundMessageUseCase(queue),
    );

    await useCase.execute({
      externalId: 'wamid.2',
      eventType: 'text',
      contactExternalId: '5215550000001',
      contactName: 'Cliente Demo',
      from: '5215550000001',
      messageId: 'wamid.2',
      messageType: 'TEXT',
      text: 'Quiero saber su horario',
      locale: 'es-MX',
      payload: {},
    });

    expect(store.aiRuns.size).toBe(0);
    const outbound = [...store.messages.values()].find(
      (message) => message.direction === 'OUTBOUND',
    );
    expect(outbound?.text).toBe(
      'Nuestro horario es de lunes a viernes de 9:00 a 18:00.',
    );
    expect(outbound?.metadata.responseSource).toBe('AUTO_REPLY');
  });
});
