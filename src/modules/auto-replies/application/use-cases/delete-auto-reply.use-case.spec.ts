import { InMemoryAutoReplyRepository } from '../../infrastructure/repositories/in-memory-auto-reply.repository';
import { DeleteAutoReplyUseCase } from './delete-auto-reply.use-case';
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

describe('DeleteAutoReplyUseCase', () => {
  it('removes the auto reply', async () => {
    const repository = new InMemoryAutoReplyRepository([buildSeed()]);
    const useCase = new DeleteAutoReplyUseCase(repository);

    await useCase.execute('reply-1');

    expect(await repository.findById('reply-1')).toBeNull();
  });

  it('throws when the auto reply does not exist', async () => {
    const repository = new InMemoryAutoReplyRepository([]);
    const useCase = new DeleteAutoReplyUseCase(repository);

    await expect(useCase.execute('missing-id')).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
