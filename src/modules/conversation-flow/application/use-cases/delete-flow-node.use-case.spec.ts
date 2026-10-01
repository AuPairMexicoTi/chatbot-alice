import { InMemoryFlowDefinitionRepository } from '../../infrastructure/repositories/in-memory-flow-definition.repository';
import { DeleteFlowNodeUseCase } from './delete-flow-node.use-case';
import { ApplicationError } from '@shared/domain/errors/application.error';

describe('DeleteFlowNodeUseCase', () => {
  it('deletes a node that is not referenced by anyone', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    await repository.createNode({
      id: 'orphan',
      content: 'Nodo sin referencias',
    });
    const useCase = new DeleteFlowNodeUseCase(repository);

    await useCase.execute('orphan');

    const definition = await repository.getDefinition();
    expect(definition.nodes.orphan).toBeUndefined();
  });

  it('rejects deleting a node that does not exist', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new DeleteFlowNodeUseCase(repository);

    await expect(useCase.execute('missing-id')).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });

  it.each(['menu', 'handoff', 'closed'])(
    'refuses to delete the protected node "%s"',
    async (id) => {
      const repository = new InMemoryFlowDefinitionRepository();
      const useCase = new DeleteFlowNodeUseCase(repository);

      await expect(useCase.execute(id)).rejects.toBeInstanceOf(
        ApplicationError,
      );
    },
  );

  it('refuses to delete a node still referenced as an option target', async () => {
    const repository = new InMemoryFlowDefinitionRepository();
    const useCase = new DeleteFlowNodeUseCase(repository);

    // "sweden" is the target of "countries"' option "8|8️⃣|suecia".
    await expect(useCase.execute('sweden')).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
