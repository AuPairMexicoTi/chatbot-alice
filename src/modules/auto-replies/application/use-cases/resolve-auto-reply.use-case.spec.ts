import { InMemoryAutoReplyRepository } from '../../infrastructure/repositories/in-memory-auto-reply.repository';
import { ResolveAutoReplyUseCase } from './resolve-auto-reply.use-case';

describe('ResolveAutoReplyUseCase', () => {
  it('matches contains patterns after normalization', async () => {
    const useCase = new ResolveAutoReplyUseCase(
      new InMemoryAutoReplyRepository([
        {
          id: 'reply-1',
          key: 'business_hours',
          title: 'Business hours',
          matchType: 'CONTAINS',
          patterns: ['horario', 'a que hora abren'],
          responseText: 'Nuestro horario es de lunes a viernes de 9:00 a 18:00.',
          responseImageUrl: null,
          priority: 10,
          isActive: true,
          locale: 'es-MX',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    );

    const result = await useCase.execute('Hola, que horario manejan?', 'es-MX');

    expect(result?.key).toBe('business_hours');
  });

  it('returns the image url when the rule includes media', async () => {
    const useCase = new ResolveAutoReplyUseCase(
      new InMemoryAutoReplyRepository([
        {
          id: 'reply-2',
          key: 'welcome',
          title: 'Welcome',
          matchType: 'CONTAINS',
          patterns: ['hola'],
          responseText: 'Bienvenida a Au Pair Mexico',
          responseImageUrl:
            'https://aupairmexico.com/wp-content/uploads/2025/04/23-2.png',
          priority: 20,
          isActive: true,
          locale: 'es-MX',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    );

    const result = await useCase.execute('Hola', 'es-MX');

    expect(result?.imageUrl).toBe(
      'https://aupairmexico.com/wp-content/uploads/2025/04/23-2.png',
    );
  });

  it('returns null when no rule matches', async () => {
    const useCase = new ResolveAutoReplyUseCase(
      new InMemoryAutoReplyRepository(),
    );

    const result = await useCase.execute('Necesito ayuda con una compra', 'es-MX');

    expect(result).toBeNull();
  });
});
