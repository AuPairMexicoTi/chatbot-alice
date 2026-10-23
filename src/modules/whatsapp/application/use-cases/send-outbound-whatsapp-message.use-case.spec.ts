import { InMemoryContactRepository } from '@modules/persistence/infrastructure/repositories/in-memory-contact.repository';
import { InMemoryConversationRepository } from '@modules/persistence/infrastructure/repositories/in-memory-conversation.repository';
import { InMemoryMessageRepository } from '@modules/persistence/infrastructure/repositories/in-memory-message.repository';
import { InMemoryStore } from '@modules/persistence/infrastructure/repositories/in-memory.store';
import { MockWhatsAppGateway } from '../../infrastructure/adapters/mock-whatsapp.gateway';
import { SendOutboundWhatsAppMessageUseCase } from './send-outbound-whatsapp-message.use-case';

describe('SendOutboundWhatsAppMessageUseCase', () => {
  it('sends an image message using metadata.imageUrl', async () => {
    const store = new InMemoryStore();
    const contactRepository = new InMemoryContactRepository(store);
    const conversationRepository = new InMemoryConversationRepository(store);
    const messageRepository = new InMemoryMessageRepository(store);
    const gateway = new MockWhatsAppGateway();

    const contact = await contactRepository.upsert({
      externalId: '5215663633325',
      name: 'Cliente Demo',
      phoneNumber: '5215663633325',
    });
    const conversation = await conversationRepository.getOrCreateByContactId(
      contact.id,
      'es-MX',
    );
    const message = await messageRepository.create({
      conversationId: conversation.id,
      direction: 'OUTBOUND',
      type: 'IMAGE',
      providerMessageId: null,
      text: 'Te compartimos el folleto.',
      status: 'QUEUED',
      metadata: {
        imageUrl: 'https://example.com/brochure.jpg',
      },
    });

    const useCase = new SendOutboundWhatsAppMessageUseCase(
      messageRepository,
      contactRepository,
      conversationRepository,
      gateway,
    );

    await useCase.execute(message.id);

    const updatedMessage = await messageRepository.findById(message.id);
    expect(updatedMessage?.status).toBe('SENT');
    expect(updatedMessage?.providerMessageId).not.toBeNull();
  });

  it('sends a menu-first template without body parameters', async () => {
    const store = new InMemoryStore();
    const contactRepository = new InMemoryContactRepository(store);
    const conversationRepository = new InMemoryConversationRepository(store);
    const messageRepository = new InMemoryMessageRepository(store);
    const gateway = new MockWhatsAppGateway();
    const sendTemplateMessage = jest.spyOn(gateway, 'sendTemplateMessage');

    const contact = await contactRepository.upsert({
      externalId: '5215663633326',
      name: 'Cliente Demo',
      phoneNumber: '5215663633326',
    });
    const conversation = await conversationRepository.getOrCreateByContactId(
      contact.id,
      'es-MX',
    );
    const message = await messageRepository.create({
      conversationId: conversation.id,
      direction: 'OUTBOUND',
      type: 'IMAGE',
      providerMessageId: null,
      text: 'Selecciona una opción.',
      status: 'QUEUED',
      metadata: {
        responseSource: 'CRM_WELCOME_TEMPLATE',
        templateName: 'bienvenida_menu',
        templateLanguage: 'es_MX',
        imageUrl: 'https://example.com/principal.jpeg',
      },
    });

    const useCase = new SendOutboundWhatsAppMessageUseCase(
      messageRepository,
      contactRepository,
      conversationRepository,
      gateway,
    );

    await useCase.execute(message.id);

    expect(sendTemplateMessage).toHaveBeenCalledWith(
      expect.objectContaining({ bodyParameters: [] }),
    );
  });
});
