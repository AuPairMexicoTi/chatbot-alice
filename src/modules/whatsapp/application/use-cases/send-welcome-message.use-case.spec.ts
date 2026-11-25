import { ConfigService } from '@nestjs/config';
import { InMemoryContactRepository } from '@modules/persistence/infrastructure/repositories/in-memory-contact.repository';
import { InMemoryConversationRepository } from '@modules/persistence/infrastructure/repositories/in-memory-conversation.repository';
import { InMemoryMessageRepository } from '@modules/persistence/infrastructure/repositories/in-memory-message.repository';
import { InMemoryStore } from '@modules/persistence/infrastructure/repositories/in-memory.store';
import { InMemoryAutoReplyRepository } from '@modules/auto-replies/infrastructure/repositories/in-memory-auto-reply.repository';
import { ApplicationError } from '@shared/domain/errors/application.error';
import { InMemoryQueueAdapter } from '../../infrastructure/adapters/in-memory-queue.adapter';
import { QueueOutboundMessageUseCase } from './queue-outbound-message.use-case';
import {
  SendWelcomeMessageUseCase,
  WELCOME_AUTO_REPLY_KEY,
} from './send-welcome-message.use-case';

describe('SendWelcomeMessageUseCase', () => {
  const buildUseCase = (whatsappConfig: Record<string, unknown> = {}) => {
    const store = new InMemoryStore();
    const contactRepository = new InMemoryContactRepository(store);
    const conversationRepository = new InMemoryConversationRepository(store);
    const messageRepository = new InMemoryMessageRepository(store);
    const autoReplyRepository = new InMemoryAutoReplyRepository();
    const queueAdapter = new InMemoryQueueAdapter();
    const queueOutboundMessageUseCase = new QueueOutboundMessageUseCase(
      queueAdapter,
    );

    const useCase = new SendWelcomeMessageUseCase(
      contactRepository,
      conversationRepository,
      messageRepository,
      autoReplyRepository,
      queueOutboundMessageUseCase,
      new ConfigService({
        CHATBOT_PUBLIC_BASE_URL: '',
        whatsapp: whatsappConfig,
      }),
    );

    return {
      useCase,
      contactRepository,
      conversationRepository,
      messageRepository,
      autoReplyRepository,
      queueAdapter,
    };
  };

  it('throws when there is no active welcome template', async () => {
    const { useCase } = buildUseCase();

    await expect(
      useCase.execute({ phoneNumber: '5215500000000', name: 'Ana' }),
    ).rejects.toThrow(ApplicationError);
  });

  it('creates a contact, conversation and queued message using the template', async () => {
    const {
      useCase,
      contactRepository,
      messageRepository,
      autoReplyRepository,
      queueAdapter,
    } = buildUseCase();

    await autoReplyRepository.create({
      key: WELCOME_AUTO_REPLY_KEY,
      title: 'Bienvenida Zapier',
      matchType: 'EXACT',
      patterns: [],
      responseText: 'Hola {{name}}, bienvenida a Au Pair Mexico.',
      responseImageUrl: null,
      priority: 0,
      isActive: true,
      locale: 'es-MX',
    });

    const result = await useCase.execute({
      phoneNumber: '5215500000000',
      name: 'Ana',
    });

    expect(result.messageId).toBeDefined();

    const contact = await contactRepository.findByExternalId('5215500000000');
    expect(contact).not.toBeNull();

    const message = await messageRepository.findById(result.messageId);
    expect(message?.text).toBe('Hola Ana, bienvenida a Au Pair Mexico.');
    expect(message?.direction).toBe('OUTBOUND');
    expect(message?.status).toBe('QUEUED');

    expect(queueAdapter.outboundJobs).toEqual([
      { messageId: result.messageId },
    ]);
  });

  it('does not fail and leaves the placeholder empty when name is missing', async () => {
    const { useCase, autoReplyRepository, messageRepository } = buildUseCase();

    await autoReplyRepository.create({
      key: WELCOME_AUTO_REPLY_KEY,
      title: 'Bienvenida Zapier',
      matchType: 'EXACT',
      patterns: [],
      responseText: 'Hola {{name}}, bienvenida.',
      responseImageUrl: null,
      priority: 0,
      isActive: true,
      locale: 'es-MX',
    });

    const result = await useCase.execute({
      phoneNumber: '5215500000001',
      name: null,
    });

    const message = await messageRepository.findById(result.messageId);
    expect(message?.text).toBe('Hola , bienvenida.');
  });

  it('does not attach a name parameter for a menu-first Meta template', async () => {
    const { useCase, autoReplyRepository, messageRepository } = buildUseCase({
      welcomeTemplateName: 'bienvenida_menu',
      welcomeTemplateUsesNameParameter: false,
    });

    await autoReplyRepository.create({
      key: WELCOME_AUTO_REPLY_KEY,
      title: 'Bienvenida menú',
      matchType: 'EXACT',
      patterns: [],
      responseText: 'Selecciona una opción: 1, 2, 3 o 4.',
      responseImageUrl: null,
      priority: 0,
      isActive: true,
      locale: 'es-MX',
    });

    const result = await useCase.execute({
      phoneNumber: '5215500000003',
      name: 'Ana',
    });

    const message = await messageRepository.findById(result.messageId);
    expect(message?.metadata.responseSource).toBe('CRM_WELCOME_TEMPLATE');
    expect(message?.metadata.templateBodyParameter).toBeUndefined();
  });

  it('does not send a second welcome when one already exists for the conversation', async () => {
    // APM dispara este webhook por lead desde un observer sin bloqueo de fila
    // -- en produccion esto duplico la bienvenida en ~77% de las
    // conversaciones (casi siempre dentro de los primeros 10s). Este es el
    // escenario real: dos llamadas practicamente seguidas para el mismo
    // telefono.
    const { useCase, messageRepository, queueAdapter, autoReplyRepository } =
      buildUseCase();

    await autoReplyRepository.create({
      key: WELCOME_AUTO_REPLY_KEY,
      title: 'Bienvenida Zapier',
      matchType: 'EXACT',
      patterns: [],
      responseText: 'Hola {{name}}, bienvenida a Au Pair Mexico.',
      responseImageUrl: null,
      priority: 0,
      isActive: true,
      locale: 'es-MX',
    });

    const first = await useCase.execute({
      phoneNumber: '5215500000004',
      name: 'Ana',
    });
    const second = await useCase.execute({
      phoneNumber: '5215500000004',
      name: 'Ana',
    });

    expect(first.alreadySent).toBe(false);
    expect(second.alreadySent).toBe(true);
    expect(second.messageId).toBe(first.messageId);
    expect(queueAdapter.outboundJobs).toHaveLength(1);

    const conversation = await messageRepository.findById(first.messageId);
    const allMessages = await messageRepository.listRecentByConversationId(
      conversation!.conversationId,
      10,
    );
    expect(allMessages).toHaveLength(1);
  });

  it('ignores an inactive template and throws', async () => {
    const { useCase, autoReplyRepository } = buildUseCase();

    await autoReplyRepository.create({
      key: WELCOME_AUTO_REPLY_KEY,
      title: 'Bienvenida Zapier',
      matchType: 'EXACT',
      patterns: [],
      responseText: 'Hola {{name}}.',
      responseImageUrl: null,
      priority: 0,
      isActive: false,
      locale: 'es-MX',
    });

    await expect(
      useCase.execute({ phoneNumber: '5215500000002', name: 'Ana' }),
    ).rejects.toThrow(ApplicationError);
  });
});
