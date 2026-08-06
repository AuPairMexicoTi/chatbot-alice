import { InMemoryConversationRepository } from '@modules/persistence/infrastructure/repositories/in-memory-conversation.repository';
import { InMemoryHandoffRepository } from '@modules/persistence/infrastructure/repositories/in-memory-handoff.repository';
import { InMemoryStore } from '@modules/persistence/infrastructure/repositories/in-memory.store';
import { RequestHumanHandoffUseCase } from './request-human-handoff.use-case';

describe('RequestHumanHandoffUseCase', () => {
  it('creates a handoff request', async () => {
    const store = new InMemoryStore();
    const conversationRepository = new InMemoryConversationRepository(store);
    const conversation = await conversationRepository.getOrCreateByContactId(
      'contact-1',
      'es-MX',
    );
    const useCase = new RequestHumanHandoffUseCase(
      new InMemoryHandoffRepository(store),
      conversationRepository,
    );

    const result = await useCase.execute(conversation.id, 'Escalation needed');
    expect(result.status).toBe('OPEN');
  });

  it('prevents duplicate open handoffs', async () => {
    const store = new InMemoryStore();
    const conversationRepository = new InMemoryConversationRepository(store);
    const conversation = await conversationRepository.getOrCreateByContactId(
      'contact-1',
      'es-MX',
    );
    const useCase = new RequestHumanHandoffUseCase(
      new InMemoryHandoffRepository(store),
      conversationRepository,
    );

    const first = await useCase.execute(conversation.id, 'One');
    const second = await useCase.execute(conversation.id, 'Two');

    expect(second.handoffId).toBe(first.handoffId);
  });
});
