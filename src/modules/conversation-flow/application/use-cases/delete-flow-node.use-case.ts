import { Inject, Injectable } from '@nestjs/common';
import {
  FLOW_DEFINITION_REPOSITORY,
  FlowDefinitionRepository,
} from '../ports/flow-definition.repository';
import { ApplicationError } from '@shared/domain/errors/application.error';
import { PROTECTED_FLOW_NODE_IDS } from '../../domain/protected-node-ids';

@Injectable()
export class DeleteFlowNodeUseCase {
  constructor(
    @Inject(FLOW_DEFINITION_REPOSITORY)
    private readonly flowDefinitionRepository: FlowDefinitionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const definition = await this.flowDefinitionRepository.getDefinition();

    if (!definition.nodes[id]) {
      throw new ApplicationError(
        'FLOW_NODE_NOT_FOUND',
        'Flow node not found',
        404,
      );
    }

    if (PROTECTED_FLOW_NODE_IDS.includes(id)) {
      throw new ApplicationError(
        'FLOW_NODE_PROTECTED',
        `Node "${id}" is required by the bot engine and cannot be deleted`,
        400,
      );
    }

    const referencingNodeIds = Object.values(definition.nodes)
      .filter((node) => Object.values(node.options ?? {}).includes(id))
      .map((node) => node.id);

    if (referencingNodeIds.length > 0) {
      throw new ApplicationError(
        'FLOW_NODE_IN_USE',
        `Node "${id}" is still a target of: ${referencingNodeIds.join(', ')}. Update or remove those options first.`,
        409,
      );
    }

    await this.flowDefinitionRepository.deleteNode(id);
  }
}
