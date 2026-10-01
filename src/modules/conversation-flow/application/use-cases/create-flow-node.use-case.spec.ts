import { InMemoryFlowDefinitionRepository } from '../../infrastructure/repositories/in-memory-flow-definition.repository';
import { CreateFlowNodeUseCase } from './create-flow-node.use-case';
import { ApplicationError } from '@shared/domain/errors/application.error';

describe('CreateFlowNodeUseCase', () => {
  it('creates a node with valid options', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new CreateFlowNodeUseCase(repository);

    const created = await useCase.execute({
      id: 'poland',
      content: 'Polonia',
      options: { '1|menu': 'menu' },
    });

    expect(created.id).toBe('poland');
    const definition = await repository.getDefinition();
    expect(definition.nodes.poland).toBeDefined();
  });

  it('rejects ids that are not lowercase kebab-case', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new CreateFlowNodeUseCase(repository);

    await expect(
      useCase.execute({ id: 'Poland_1', content: 'Polonia' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('rejects an id that already exists', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new CreateFlowNodeUseCase(repository);

    await expect(
      useCase.execute({ id: 'menu', content: 'duplicate' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('rejects options pointing at unknown target nodes', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new CreateFlowNodeUseCase(repository);

    await expect(
      useCase.execute({
        id: 'poland',
        content: 'Polonia',
        options: { '1|menu': 'does-not-exist' },
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
