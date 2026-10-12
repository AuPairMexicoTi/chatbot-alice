import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { PrismaFlowDefinitionRepository } from './prisma-flow-definition.repository';

describe('PrismaFlowDefinitionRepository', () => {
  it('uses the canonical flow and public image URLs when APM has no saved nodes', async () => {
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

    expect(definition.nodes.menu.imageUrl).toBe(
      'https://bot.aupairmexico.com/api/v1/assets/principal.jpeg',
    );
    expect(definition.nodes.germany.imageUrl).toBe(
      'https://bot.aupairmexico.com/api/v1/assets/alemania.jpeg',
    );
    expect(definition.nodes.denmark.imageUrl).toBeUndefined();
  });
});
