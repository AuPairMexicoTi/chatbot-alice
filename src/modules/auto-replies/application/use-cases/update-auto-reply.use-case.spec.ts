import { InMemoryAutoReplyRepository } from '../../infrastructure/repositories/in-memory-auto-reply.repository';
import { UpdateAutoReplyUseCase } from './update-auto-reply.use-case';
import { ApplicationError } from '@shared/domain/errors/application.error';

const buildSeed = () => ({
  id: 'reply-1',
  key: 'welcome',
  title: 'Welcome',
  matchType: 'CONTAINS' as const,
  patterns: ['hola'],
  responseText: 'Bienvenida a Au Pair Mexico',
  responseImageUrl: null,
  priority: 0,
  isActive: true,
  locale: 'es-MX',
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe('UpdateAutoReplyUseCase', () => {
  it('updates only the provided fields', async () => {
    const repository = new InMemoryAutoReplyRepository([buildSeed()]);
    const useCase = new UpdateAutoReplyUseCase(repository);

    const result = await useCase.execute('reply-1', {
      title: 'Bienvenida actualizada',
      isActive: false,
    });

    expect(result.title).toBe('Bienvenida actualizada');
    expect(result.isActive).toBe(false);
    expect(result.responseText).toBe('Bienvenida a Au Pair Mexico');
  });

  it('throws when the auto reply does not exist', async () => {
    const repository = new InMemoryAutoReplyRepository([]);
    const useCase = new UpdateAutoReplyUseCase(repository);

    await expect(
      useCase.execute('missing-id', { title: 'x' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
