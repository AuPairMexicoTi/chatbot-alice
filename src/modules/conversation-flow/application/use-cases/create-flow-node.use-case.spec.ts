import { InMemoryFlowDefinitionRepository } from '../../infrastructure/repositories/in-memory-flow-definition.repository';
import { CreateFlowNodeUseCase } from './create-flow-node.use-case';
import { ApplicationError } from '@shared/domain/errors/application.error';

describe('CreateFlowNodeUseCase', () => {
  it('creates a draft node with only id, content and image', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new CreateFlowNodeUseCase(repository);

    const created = await useCase.execute({
      id: 'promo-verano',
      content: 'Promoción de verano',
      imageUrl: 'https://example.com/promo.jpg',
    });

    expect(created.id).toBe('promo-verano');
    expect(created.options).toBeUndefined();
    const definition = await repository.getDefinition();
    expect(definition.nodes['promo-verano']).toBeDefined();
  });

  it('rejects ids that are not lowercase kebab-case', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new CreateFlowNodeUseCase(repository);

    await expect(
      useCase.execute({ id: 'Promo_Verano', content: 'x' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('rejects an id that already exists', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new CreateFlowNodeUseCase(repository);

    await expect(
      useCase.execute({ id: 'menu', content: 'duplicate' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
