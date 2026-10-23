import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { PrismaFlowDefinitionRepository } from './prisma-flow-definition.repository';

describe('PrismaFlowDefinitionRepository', () => {
  it('uses the canonical PDF flow when APM has no saved nodes', async () => {
    const prisma = {
      flowNode: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    } as unknown as PrismaService;
    const repository = new PrismaFlowDefinitionRepository(
      prisma,
      'https://bot.aupairmexico.com',
    );

    const definition = await repository.getDefinition();

    expect(definition.entryNodeId).toBe('main-menu');
    expect(definition.nodes.requirements.content).toContain(
      'Requisitos para ser Au Pair',
    );
    expect(definition.nodes['contact-advisor'].imageUrl).toBeUndefined();
  });
});
